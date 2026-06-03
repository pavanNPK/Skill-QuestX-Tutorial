# SkillQuestX Server Architecture

This backend follows a 4-layer architecture:

```text
Client
  -> Presentation Layer
  -> Controller Layer
  -> Business Layer
  -> Data Layer
  -> MongoDB
```

The goal is simple: every file has one clear responsibility. Routes should not contain business rules. Controllers should not write database queries. Services should not know Fastify request/reply details. Models should only describe MongoDB data.

## Current Folder Structure

```text
server/
  src/
    server.ts                 # Starts the real HTTP server.
    core/                     # Shared app setup, config, types, constants, utilities.
      build-app.ts            # Creates Fastify, registers middleware, mounts routes.
      config/                 # Environment configuration.
      constants/              # Shared constants like roles.
      types/                  # Shared TypeScript contracts.
      utils/                  # Shared helpers like upload and HttpError.
    presentation/             # Presentation Layer.
      middlewares/            # Fastify hooks/plugins: auth, CSRF, security.
      dto/                    # Request validation schemas.
      routes/                 # URL/method/preHandler/schema/handler binding.
    controller/               # Controller Layer.
      controllers/            # Request orchestration.
    business/                 # Business Layer.
      services/               # Business rules and workflow coordination.
    data/                     # Data Layer.
      config/                 # MongoDB connection.
      models/                 # Mongoose schemas/models.
```

## Layer Responsibilities

### 1. Presentation Layer

Files:

```text
src/presentation/routes/
src/presentation/dto/
src/presentation/middlewares/
src/core/build-app.ts
```

Use this layer for HTTP-only work:

- URL paths.
- HTTP methods: `GET`, `POST`, `PUT`, `PATCH`, `DELETE`.
- `preHandler` hooks.
- JSON schema validation.
- Multipart setup.
- CORS, Helmet, rate limit, cookies, CSRF.
- Route registration.

Do not put database queries or business decisions here.

Example route:

```ts
app.post('/products', {
  preHandler: [app.authenticate, app.requireRoles('admin')],
  schema: createProductSchema,
  handler: productController.create,
});
```

Meaning:

- `app.post('/products')`: exposes `POST /api/products`.
- `preHandler`: runs middleware before the controller.
- `app.authenticate`: comes from `src/presentation/middlewares/auth.middleware.ts`; verifies JWT and sets `request.user`.
- `app.requireRoles('admin')`: checks authorization.
- `schema`: comes from `src/dto`; Fastify/AJV validates request body/params before handler.
- `handler`: calls the controller method.

### 2. Controller Layer

Files:

```text
src/controller/controllers/
```

Use this layer to translate Fastify requests into service calls:

- Read `request.params`.
- Read `request.body`.
- Read authenticated `request.user`.
- Call one service method.
- Return DTO-shaped response.

Do not write Mongoose queries here. Do not implement domain rules here.

Example controller:

```ts
import type { FastifyRequest } from 'fastify';
import { services } from '../../business/services';
import type { AuthenticatedRequest } from '../../core/types/fastify-auth';

export class ProductController {
  // use of this is:
  // Creates a product using validated request body and authenticated creator id.
  async create(request: FastifyRequest) {
    const user = (request as AuthenticatedRequest).user;
    return services.productService.create(request.body as any, user.id);
  }
}

export const productController = new ProductController();
```

### 3. Business Layer

Files:

```text
src/business/services/
```

Use this layer for application rules:

- Permission decisions.
- Validation that depends on database state.
- Normalization.
- Email/notification side effects.
- Database coordination.
- Response mapping.

Services can use models, other services, and framework-safe utilities like `badRequest`.

Example service:

```ts
import { Types } from 'mongoose';
import { ProductModel } from '../../data/models/product.model';
import { badRequest } from '../../core/utils/http-error';

export class ProductService {
  // use of this is:
  // Creates a product after normalizing the body and attaching creator id.
  async create(dto: any, createdBy: string) {
    if (!dto.name?.trim()) throw badRequest('Product name is required.');

    const product = await ProductModel.create({
      name: dto.name.trim(),
      price: Number(dto.price ?? 0),
      isActive: dto.isActive !== false,
      createdBy: new Types.ObjectId(createdBy),
    });

    return this.toResponse(product);
  }

  // use of this is:
  // Maps Mongo document into API response so controllers do not expose Mongoose internals.
  private toResponse(product: any) {
    return {
      id: product._id.toString(),
      name: product.name,
      price: product.price,
      isActive: product.isActive,
    };
  }
}
```

### 4. Data Layer

Files:

```text
src/data/models/
src/data/config/database.ts
```

Use this layer for MongoDB structure:

- Mongoose schemas.
- Mongoose models.
- Indexes.
- TypeScript document interfaces.
- Database connection.

Do not put HTTP request logic here. Do not send emails here.

Example model:

```ts
import mongoose = require('mongoose');
import type { Document, Model, Types } from 'mongoose';

export interface ProductDocument extends Document {
  name: string;
  price: number;
  isActive: boolean;
  imageUrl: string | null;
  createdBy: Types.ObjectId;
}

// use of this is:
// Stores product records created by admin users.
const productSchema = new mongoose.Schema<ProductDocument>(
  {
    name: { type: String, required: true, trim: true },
    price: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
    imageUrl: { type: String, default: null },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true },
);

productSchema.index({ createdAt: -1 });

export const ProductModel: Model<ProductDocument> =
  mongoose.models.Product as Model<ProductDocument> ||
  mongoose.model<ProductDocument>('Product', productSchema);
```

## Request Flow

Normal JSON request:

```text
Angular
  -> Fastify route in src/routes
  -> middleware preHandler from src/middlewares
  -> schema validation from src/dto
  -> controller in src/controllers
  -> service in src/services
  -> model in src/models
  -> MongoDB
  -> service maps response
  -> controller returns response
  -> Fastify sends JSON
```

File upload request:

```text
Angular multipart/form-data
  -> Fastify route
  -> @fastify/multipart from security.middleware.ts
  -> controller calls request.file()
  -> upload utility validates/streams file
  -> service stores metadata
  -> model saves metadata in MongoDB
  -> Fastify sends JSON
```

## How The App Starts

Start file:

```text
src/server.ts
```

Flow:

```text
server.ts
  -> validateEnv()
  -> connectDatabase()
  -> buildApp()
  -> app.listen()
```

`src/core/config/env.ts` loads `.env`:

```ts
dotenv.config({ path: path.resolve(process.cwd(), '.env'), quiet: true });
```

`src/data/config/database.ts` connects MongoDB:

```ts
export async function connectDatabase(): Promise<void> {
  await mongoose.connect(env.mongodbUri);
}
```

`src/core/build-app.ts` creates Fastify:

```ts
const app = fastify({
  logger: { level: env.nodeEnv === 'production' ? 'info' : 'debug' },
  bodyLimit: 2 * 1024 * 1024,
});
```

Then it registers:

```text
security middleware
CSRF middleware
auth middleware
API route groups under /api
```

## Middleware Rules

Middleware files live in:

```text
src/presentation/middlewares/
```

Current middleware:

- `security.middleware.ts`: cookies, Helmet, CORS, rate limit, form body, multipart, static uploads.
- `csrf.middleware.ts`: validates CSRF cookie/header for unsafe cookie-authenticated requests.
- `auth.middleware.ts`: adds `app.authenticate`, `app.requireRoles`, and `request.user`.

How to write middleware:

```ts
import fp = require('fastify-plugin');
import type { FastifyPluginAsync } from 'fastify';

const auditPlugin: FastifyPluginAsync = async (app) => {
  // use of this is:
  // Runs before every route registered after this plugin.
  app.addHook('preHandler', async (request) => {
    request.log.info({ method: request.method, url: request.url }, 'request audit');
  });
};

export const auditPluginRegistration = fp(auditPlugin, { name: 'audit-plugin' });
```

Connect it in `src/core/build-app.ts`:

```ts
await app.register(auditPluginRegistration);
```

Use route-specific middleware:

```ts
app.get('/admin-only', {
  preHandler: [app.authenticate, app.requireRoles('admin')],
  handler: controller.adminOnly,
});
```

## Schema Validation

DTO schemas live in:

```text
src/presentation/dto/
```

Fastify uses AJV JSON schema validation. Validation happens before the controller.

Example DTO:

```ts
export const createProductSchema = {
  body: {
    type: 'object',
    required: ['name'],
    additionalProperties: false,
    properties: {
      name: { type: 'string', minLength: 1, maxLength: 160 },
      price: { type: 'number', minimum: 0 },
      isActive: { type: 'boolean' },
    },
  },
};

export const productIdParamsSchema = {
  type: 'object',
  required: ['id'],
  additionalProperties: false,
  properties: {
    id: { type: 'string', minLength: 1, maxLength: 64 },
  },
};
```

Use it in route:

```ts
app.post('/products', {
  preHandler: [app.authenticate],
  schema: createProductSchema,
  handler: productController.create,
});
```

Important rules:

- Keep request schemas strict.
- Use `additionalProperties: false` when the body contract is known.
- Use shared schemas in `src/presentation/dto/shared.schemas.ts` for common `:id` params.
- Use controller/service normalization for flexible editor/import payloads.

## Adding A New API From Start To End

Example feature: `products`.

### Step 1: Create Data Layer Model

Create:

```text
src/data/models/product.model.ts
```

```ts
import mongoose = require('mongoose');
import type { Document, Model, Types } from 'mongoose';

export interface ProductDocument extends Document {
  name: string;
  price: number;
  isActive: boolean;
  imageUrl: string | null;
  createdBy: Types.ObjectId;
}

const productSchema = new mongoose.Schema<ProductDocument>(
  {
    name: { type: String, required: true, trim: true },
    price: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
    imageUrl: { type: String, default: null },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true },
);

productSchema.index({ createdAt: -1 });

export const ProductModel: Model<ProductDocument> =
  mongoose.models.Product as Model<ProductDocument> ||
  mongoose.model<ProductDocument>('Product', productSchema);
```

### Step 2: Create DTO Validation

Create:

```text
src/presentation/dto/product.schemas.ts
```

```ts
export const productIdParamsSchema = {
  type: 'object',
  required: ['id'],
  additionalProperties: false,
  properties: {
    id: { type: 'string', minLength: 1, maxLength: 64 },
  },
};

export const createProductSchema = {
  body: {
    type: 'object',
    required: ['name'],
    additionalProperties: false,
    properties: {
      name: { type: 'string', minLength: 1, maxLength: 160 },
      price: { type: 'number', minimum: 0 },
      isActive: { type: 'boolean' },
    },
  },
};

export const updateProductSchema = {
  params: productIdParamsSchema,
  body: {
    type: 'object',
    required: ['name', 'price', 'isActive'],
    additionalProperties: false,
    properties: {
      name: { type: 'string', minLength: 1, maxLength: 160 },
      price: { type: 'number', minimum: 0 },
      isActive: { type: 'boolean' },
    },
  },
};

export const patchProductSchema = {
  params: productIdParamsSchema,
  body: {
    type: 'object',
    minProperties: 1,
    additionalProperties: false,
    properties: {
      name: { type: 'string', minLength: 1, maxLength: 160 },
      price: { type: 'number', minimum: 0 },
      isActive: { type: 'boolean' },
    },
  },
};
```

### Step 3: Create Business Service

Create:

```text
src/business/services/product.service.ts
```

```ts
import { Types } from 'mongoose';
import { ProductModel } from '../../data/models/product.model';
import { badRequest } from '../../core/utils/http-error';

export class ProductService {
  async list() {
    const products = await ProductModel.find().sort({ createdAt: -1 }).lean().exec();
    return products.map((product: any) => this.toResponse(product));
  }

  async getById(id: string) {
    if (!Types.ObjectId.isValid(id)) throw badRequest('Invalid product id.');
    const product = await ProductModel.findById(id).lean().exec();
    if (!product) throw badRequest('Product not found.');
    return this.toResponse(product);
  }

  async create(dto: any, createdBy: string) {
    const product = await ProductModel.create({
      name: dto.name.trim(),
      price: Number(dto.price ?? 0),
      isActive: dto.isActive !== false,
      imageUrl: null,
      createdBy: new Types.ObjectId(createdBy),
    });
    return this.toResponse(product);
  }

  async replace(id: string, dto: any) {
    if (!Types.ObjectId.isValid(id)) throw badRequest('Invalid product id.');
    const product = await ProductModel.findByIdAndUpdate(
      id,
      {
        $set: {
          name: dto.name.trim(),
          price: Number(dto.price),
          isActive: dto.isActive === true,
        },
      },
      { new: true },
    ).exec();
    if (!product) throw badRequest('Product not found.');
    return this.toResponse(product);
  }

  async patch(id: string, dto: any) {
    if (!Types.ObjectId.isValid(id)) throw badRequest('Invalid product id.');
    const updates: Record<string, unknown> = {};
    if (dto.name != null) updates.name = dto.name.trim();
    if (dto.price != null) updates.price = Number(dto.price);
    if (dto.isActive != null) updates.isActive = dto.isActive === true;

    const product = await ProductModel.findByIdAndUpdate(id, { $set: updates }, { new: true }).exec();
    if (!product) throw badRequest('Product not found.');
    return this.toResponse(product);
  }

  async delete(id: string) {
    if (!Types.ObjectId.isValid(id)) throw badRequest('Invalid product id.');
    const result = await ProductModel.deleteOne({ _id: new Types.ObjectId(id) }).exec();
    return { deleted: result.deletedCount > 0 };
  }

  async setImage(id: string, imageUrl: string) {
    if (!Types.ObjectId.isValid(id)) throw badRequest('Invalid product id.');
    const product = await ProductModel.findByIdAndUpdate(id, { $set: { imageUrl } }, { new: true }).exec();
    if (!product) throw badRequest('Product not found.');
    return this.toResponse(product);
  }

  private toResponse(product: any) {
    return {
      id: product._id.toString(),
      name: product.name,
      price: product.price,
      isActive: product.isActive,
      imageUrl: product.imageUrl ?? null,
    };
  }
}
```

### Step 4: Register Service

Update:

```text
src/business/services/index.ts
```

```ts
import { ProductService } from './product.service';

const productService = new ProductService();

export const services = {
  productService,
};
```

Keep existing services in the object. Add only the new one.

### Step 5: Create Controller

Create:

```text
src/controller/controllers/product.controller.ts
```

```ts
import { existsSync, mkdirSync } from 'fs';
import { join } from 'path';
import type { FastifyRequest } from 'fastify';

import { services } from '../../business/services';
import type { AuthenticatedRequest } from '../../core/types/fastify-auth';
import { requireMultipartFile, saveMultipartFile } from '../../core/utils/upload';

const productUploadDir = join(process.cwd(), 'uploads', 'products');
if (!existsSync(productUploadDir)) mkdirSync(productUploadDir, { recursive: true });

const imageMimes = new Set(['image/jpeg', 'image/png', 'image/webp']);

export class ProductController {
  async list() {
    return services.productService.list();
  }

  async getById(request: FastifyRequest) {
    const params = request.params as { id: string };
    return services.productService.getById(params.id);
  }

  async create(request: FastifyRequest) {
    const user = (request as AuthenticatedRequest).user;
    return services.productService.create(request.body as any, user.id);
  }

  async replace(request: FastifyRequest) {
    const params = request.params as { id: string };
    return services.productService.replace(params.id, request.body as any);
  }

  async patch(request: FastifyRequest) {
    const params = request.params as { id: string };
    return services.productService.patch(params.id, request.body as any);
  }

  async delete(request: FastifyRequest) {
    const params = request.params as { id: string };
    return services.productService.delete(params.id);
  }

  async uploadImage(request: FastifyRequest) {
    const params = request.params as { id: string };
    const part = await requireMultipartFile(await request.file(), 'No image uploaded.');
    const file = await saveMultipartFile(part, productUploadDir, 'product', 5 * 1024 * 1024, imageMimes);
    return services.productService.setImage(params.id, `/uploads/products/${file.filename}`);
  }
}

export const productController = new ProductController();
```

### Step 6: Create Routes

Create:

```text
src/presentation/routes/product.routes.ts
```

```ts
import type { FastifyPluginAsync } from 'fastify';

import { productController } from '../../controller/controllers/product.controller';
import {
  createProductSchema,
  patchProductSchema,
  productIdParamsSchema,
  updateProductSchema,
} from '../dto/product.schemas';

export const productRoutes: FastifyPluginAsync = async (app) => {
  app.get('/', {
    preHandler: [app.authenticate],
    handler: productController.list,
  });

  app.get('/:id', {
    preHandler: [app.authenticate],
    schema: { params: productIdParamsSchema },
    handler: productController.getById,
  });

  app.post('/', {
    preHandler: [app.authenticate, app.requireRoles('admin', 'super_admin')],
    schema: createProductSchema,
    handler: productController.create,
  });

  app.put('/:id', {
    preHandler: [app.authenticate, app.requireRoles('admin', 'super_admin')],
    schema: updateProductSchema,
    handler: productController.replace,
  });

  app.patch('/:id', {
    preHandler: [app.authenticate, app.requireRoles('admin', 'super_admin')],
    schema: patchProductSchema,
    handler: productController.patch,
  });

  app.delete('/:id', {
    preHandler: [app.authenticate, app.requireRoles('admin', 'super_admin')],
    schema: { params: productIdParamsSchema },
    handler: productController.delete,
  });

  app.post('/:id/image', {
    preHandler: [app.authenticate, app.requireRoles('admin', 'super_admin')],
    schema: { params: productIdParamsSchema },
    handler: productController.uploadImage,
  });
};
```

### Step 7: Mount Routes

Update:

```text
src/core/build-app.ts
```

Import:

```ts
import { productRoutes } from '../presentation/routes/product.routes';
```

Register under `/api`:

```ts
await api.register(productRoutes, { prefix: '/products' });
```

Final URLs:

```text
GET    /api/products
GET    /api/products/:id
POST   /api/products
PUT    /api/products/:id
PATCH  /api/products/:id
DELETE /api/products/:id
POST   /api/products/:id/image
```

### Step 8: Build And Verify

Run:

```bash
npm --prefix server run build
```

Route registration check:

```bash
cd server
node -e "require('./dist/core/build-app').buildApp().then(async app => { await app.ready(); console.log('fastify app ready'); await app.close(); })"
```

## CRUD Method Meaning

Use these rules:

```text
GET     Read/list data. No body. No mutation.
POST    Create a new resource or submit an action.
PUT     Replace the full resource.
PATCH   Update only selected fields.
DELETE  Delete or deactivate a resource.
```

Examples:

```text
GET    /api/products             list products
GET    /api/products/:id         get one product
POST   /api/products             create product
PUT    /api/products/:id         replace product
PATCH  /api/products/:id         partial update
DELETE /api/products/:id         delete product
POST   /api/products/:id/image   upload product image
```

## File Upload Pattern

Required pieces:

```text
security.middleware.ts registers @fastify/multipart
route declares upload endpoint
controller calls request.file()
upload utility validates and saves file
service stores metadata/url
```

Controller upload example:

```ts
const part = await requireMultipartFile(await request.file(), 'No file uploaded.');
const file = await saveMultipartFile(part, targetDir, 'prefix', 5 * 1024 * 1024, allowedMimes);
return service.saveFileMetadata(`/uploads/example/${file.filename}`);
```

Important rules:

- Validate MIME type for public uploads.
- Set max file size.
- Generate server filenames; do not trust browser filenames for stored paths.
- Store metadata in MongoDB when the app needs ownership/history.
- Serve uploaded files through `/uploads/...`.

## Security Rules

Current backend security:

- Helmet headers.
- Strict CORS using `CLIENT_URL`.
- Global rate limit.
- Stricter auth/OTP route rate limit.
- JWT auth with `Authorization: Bearer <token>`.
- Role authorization with `app.requireRoles(...)`.
- CSRF guard for unsafe cookie-authenticated requests.
- JSON body limit.
- Multipart size limits.
- Upload MIME/extension checks.
- Production `JWT_SECRET` validation.
- Redacted logs for passwords and authorization headers.
- Central error handler that avoids leaking stack traces.

When adding a new API:

- Use `app.authenticate` unless endpoint is intentionally public.
- Use `app.requireRoles(...)` for admin/instructor-only behavior.
- Add a DTO schema for params/body.
- Validate ownership in the service if users can only access their own records.
- Throw `badRequest`, `unauthorized`, `forbidden`, or `conflict` from `core/utils/http-error.ts`.

## How Files Are Connected

Example for auth:

```text
build-app.ts
  -> registers authRoutes at /api/auth

auth.routes.ts
  -> declares /login, /me, /users routes
  -> attaches schemas and preHandlers
  -> calls authController methods

auth.controller.ts
  -> reads request.body, request.params, request.user
  -> calls services.authService

auth.service.ts
  -> validates password, OTP, roles, permissions
  -> calls UserService, CourseService, MailService, NotificationService

user.service.ts
  -> uses UserModel

user.model.ts
  -> defines MongoDB users collection shape
```

This pattern should be used for every new API.

## Development Commands

Install:

```bash
cd server
npm install
```

Build:

```bash
npm run build
```

Start:

```bash
npm start
```

Development start:

```bash
npm run start:dev
```

## Environment

Use `.env` in `server/`.

Important variables:

```text
PORT=3000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/skillquestx
JWT_SECRET=change-this-secret
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:4200
MAIL_HOST=
MAIL_PORT=465
MAIL_SECURE=true
MAIL_USER=
MAIL_PASSWORD=
MAIL_FROM=SkillQuestX <noreply@skillquestx.com>
VAPID_PUBLIC_KEY=
VAPID_PRIVATE_KEY=
```

Production rules:

- `JWT_SECRET` must not be the default.
- `JWT_SECRET` must be at least 32 characters.
- `CLIENT_URL` must be a valid `http://` or `https://` origin.
- `MONGODB_URI` must be configured.

## Final Rule

For any new feature, create files in this order:

```text
1. Data Layer:        src/data/models/<feature>.model.ts
2. Presentation DTO:  src/presentation/dto/<feature>.schemas.ts
3. Business Layer:    src/business/services/<feature>.service.ts
4. Service Wiring:    src/business/services/index.ts
5. Controller Layer:  src/controller/controllers/<feature>.controller.ts
6. Presentation Route:src/presentation/routes/<feature>.routes.ts
7. App Mounting:      src/core/build-app.ts
8. Verification:      npm --prefix server run build
```
