# Setup & Answers

## 1. Node.js vs NestJS for the backend

**Recommendation: use NestJS.**

| | Node.js (Express/Fastify) | NestJS |
|---|---------------------------|--------|
| **Structure** | You define folders and patterns | Built-in modules, controllers, services, guards |
| **TypeScript** | Optional, manual setup | First-class, strict by default |
| **Auth** | Manual (JWT, passport, etc.) | `@nestjs/jwt`, `@nestjs/passport`, guards out of the box |
| **Validation** | Manual or add-ons | `class-validator` / `class-transformer` (Pipes) |
| **DB / ORM** | You wire Mongoose/Prisma | `@nestjs/mongoose` or TypeORM, clean DI |
| **Scaling** | Depends on your discipline | Modules and dependency injection scale well |

For **login/registration with token auth**, **MongoDB**, and **mail (e.g. Hostinger)**, NestJS gives you a clear structure, built-in auth patterns, and less boilerplate. So the backend in this repo is set up with **NestJS**.

---

## 2. MongoDB URL – is the Compass one OK?

**Yes.** The connection string you get when you choose **“Compass”** in the Atlas “Connect” dialog is the same format as the one used by **Drivers** (Node.js / NestJS).

- It looks like:  
  `mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<dbname>?retryWrites=true&w=majority`
- Use this **exact same URL** in your NestJS app (in `.env` as `MONGODB_URI` or `DATABASE_URL`).
- Only replace `<username>`, `<password>`, and optionally `<dbname>` with your real values. Do **not** commit this URL to git; keep it in `.env` and add `.env` to `.gitignore`.

So: **Compass connection string = Driver connection string** for this use case. You’re good to use it in the backend.

---

## 3. Hostinger mail – how to connect and is an app password required?

Hostinger uses **SMTP** for sending mail. To send from your app (e.g. NestJS):

1. **Get SMTP details from Hostinger**  
   In Hostinger: **Emails** → your domain → **Connect device / SMTP**. You’ll see:
   - Server: e.g. `smtp.hostinger.com`
   - Port: **465** (SSL) or **587** (TLS)
   - Username: your full email (e.g. `noreply@yourdomain.com`)
   - Password: either the normal email password or an **App password** (see below)

2. **Is an app password required?**  
   - If Hostinger offers **“App password”** or **“Application password”** for that mailbox, **use it** instead of your normal email password. It’s more secure and often required when 2FA or “less secure apps” restrictions are on.
   - If there is no app password option, use the **normal email password** for that mailbox. Prefer a dedicated mailbox (e.g. `noreply@yourdomain.com`) for sending from the app.

3. **How to create an app password (when available)**  
   - In Hostinger: **Emails** → select the account → look for **“App passwords”** or **“Security” / “2FA”**.  
   - Create a new app password, copy it once, and use it in your app as the SMTP password.  
   - If you don’t see it, check Hostinger’s help for “SMTP” or “app password”; it varies by plan.

4. **In the NestJS backend**  
   - Store in `.env`:  
     `MAIL_HOST`, `MAIL_PORT`, `MAIL_USER`, `MAIL_PASSWORD` (your app password or email password), `MAIL_FROM`.  
   - The backend uses these in a mail module (e.g. Nodemailer) to send registration/OTP/password-reset emails.

---

## 4. Project layout (client + server)

- **`client/`** – Angular app (frontend). Entire current project lives here.
- **`server/`** – NestJS app (backend): auth (login/register, JWT), MongoDB, optional mail for OTP/password reset.

Root `package.json` can have scripts like `"start:client"`, `"start:server"` (and optionally `"start"` running both) for convenience.

---

## 5. Auth guards and lazy loading (frontend)

The app uses:

- **CanMatch** (`authLoadGuard`) – decides whether to load the protected route bundle at all (no token → don’t load).
- **CanActivate** (`authGuard`) – allows/denies access to the route.
- **CanActivateChild** (`authChildGuard`) – same check for child routes.

All feature modules (dashboard, courses, materials, classes, tasks, batches, exams, projects) are **lazy-loaded** via `loadChildren`. No change needed for “all lazy loading” beyond what’s already there; the new backend simply replaces the static token with a real JWT from the API.

---

## 6. Loader overlay

A **full-screen overlay** with:

- **Blur** (white or black) for the whole screen  
- **Centered SVG loader** (training/project style)  
- Shown during HTTP requests (via an HTTP interceptor) and optionally via a `LoaderService` for other async actions  

is implemented under `client` in shared components and wired via interceptor and optional service.

---

## 7. How to run

1. **Backend (server)**  
   - `cd server`  
   - Copy `server/.env.example` to `server/.env` and set `MONGODB_URI` (your Compass/Atlas URL), `JWT_SECRET`, and optionally Hostinger SMTP vars.  
   - `npm install --legacy-peer-deps` (if you hit peer dependency errors with Nest 11)  
   - `npm run start:dev`  

2. **Frontend (client)**  
   - `cd client`  
   - `npm install --legacy-peer-deps` (if needed)  
   - Set `apiUrl` in `client/src/environments/environment.ts` to `http://localhost:3000` (default).  
   - `npm start`  

3. **From root**  
   - `npm run install:all` then `npm run start:client` and `npm run start:server` in two terminals.
