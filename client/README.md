# SkillQuestX Frontend Architecture

This Angular app uses a feature-first architecture with SignalStore state.

The target flow is:

```text
Route
  -> Feature Page
  -> Feature Store
  -> Feature/Core Service
  -> HTTP Interceptor
  -> Backend API
```

The goal is fast and smooth loading:

- lazy-load feature routes;
- keep API state in feature stores;
- cache data that users revisit;
- avoid duplicate API calls;
- unsubscribe from streams when components are destroyed;
- keep heavy UI work out of templates;
- use root store only for app-wide state.

## Current Folder Structure

```text
client/
  src/app/
    core/                         # App-wide Angular contracts: auth store, guards, interceptors.
      auth/                       # Auth SignalStore.
      domain/                     # Core app contracts/constants.
      guards/                     # Route guards.
      interceptors/               # HTTP interceptors.
      pages/                      # App-level pages.
      resolvers/                  # Route resolvers.
    features/                     # Feature-first architecture.
      <feature>/
        pages/                    # Smart route containers.
        components/               # Feature reusable UI.
        domain/                   # Models, enums, DTOs, mappers.
        services/                 # Feature API adapters.
        state/                    # Feature SignalStore.
        pipes/                    # Feature-only pipes.
    shared/                       # Cross-feature UI, directives, pipes, modal, models, services.
      components/base.component.ts # Base component for subscription cleanup.
    store/                        # Root app SignalStore.
    utils/                        # Utility-only models/data.
```

## Store Rules

### Root Store

File:

```text
src/app/store/app.store.ts
```

Use root store only for app-wide state:

- global loading count;
- app shell readiness;
- global preferences;
- app-wide UI state.

Do not store feature API lists here. Course material state belongs to Materials store, exams belong to Exams store, tasks belong to Tasks store.

### Feature Store

Each feature should have its own store:

```text
src/app/features/<feature>/state/<feature>.store.ts
```

Use feature stores for:

- API loading flags;
- feature errors;
- selected item id;
- cached API responses;
- computed values used by multiple parts of the feature.

Example:

```ts
export const MaterialsStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed((store) => ({
    visibleCourses: computed(() => store.courses()),
  })),
  withMethods((store, service = inject(CourseContentService)) => ({
    async loadAvailableCourses() {
      const courses = await firstValueFrom(service.getAvailableCourses());
      patchState(store, { courses });
      return courses;
    },
  })),
);
```

## Base Component

File:

```text
src/app/shared/components/base.component.ts
```

Use this when a component manually subscribes to Observables:

```ts
export class Materials extends BaseComponent implements OnInit {
  ngOnInit() {
    this.router.events
      .pipe(this.untilDestroyed())
      .subscribe(() => {
        // route logic
      });
  }

  override ngOnDestroy() {
    // component cleanup
    super.ngOnDestroy();
  }
}
```

Why:

- prevents memory leaks;
- stops API/router subscriptions after page destroy;
- keeps unsubscribe code consistent;
- avoids repeating `Subject + takeUntil` in every component.

## Feature Folder Rule

For new features, create:

```text
features/<feature-name>/
  pages/
  components/
  domain/
  services/
  state/
  pipes/
```

Meaning:

- `pages`: route-level smart components that talk to stores.
- `components`: reusable feature UI that receives inputs and emits events.
- `domain`: models, request/response contracts, enums, mappers.
- `services`: API calls only.
- `state`: SignalStore state and computed values.
- `pipes`: formatting helpers used only by that feature.

## API Call Pattern

Use this connection:

```text
Component/Page
  -> Feature Store
  -> Service
  -> HttpClient
  -> Auth Interceptor
  -> Backend
```

Do not call `HttpClient` directly from components.

Service example:

```ts
@Injectable({ providedIn: 'root' })
export class ProductService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  list() {
    return this.http.get<Product[]>(`${this.apiUrl}/products`);
  }
}
```

Store example:

```ts
export const ProductStore = signalStore(
  { providedIn: 'root' },
  withState({ products: [], loading: false, error: '' }),
  withMethods((store, service = inject(ProductService)) => ({
    async loadProducts() {
      patchState(store, { loading: true, error: '' });
      try {
        const products = await firstValueFrom(service.list());
        patchState(store, { products, loading: false });
      } catch {
        patchState(store, { loading: false, error: 'Could not load products.' });
      }
    },
  })),
);
```

Component example:

```ts
export class ProductPage {
  readonly store = inject(ProductStore);

  ngOnInit() {
    this.store.loadProducts();
  }
}
```

Template example:

```html
@if (store.loading()) {
  <sqx-loader-overlay />
} @else {
  @for (product of store.products(); track product.id) {
    <app-product-card [product]="product" />
  }
}
```

## Smooth Loading Rules

Use these rules for fast pages:

- Lazy-load routes.
- Keep loaded feature data in a feature store.
- Cache detail data by id when users revisit it.
- Do not log every API response in normal mode.
- Use `track item.id` in `@for`.
- Do not call methods in templates if they do heavy work.
- Use computed signals for derived lists/counts.
- Avoid nested subscriptions; use store methods or RxJS composition.
- Use `BaseComponent` for manual subscriptions.
- Keep API response payloads small on the backend.
- Show lightweight skeleton/empty states instead of blocking the full page.

## Materials Feature

Implemented store:

```text
src/app/features/materials/state/materials.store.ts
```

What it does:

- caches available material courses;
- caches loaded course content by course id;
- avoids duplicate material API calls when returning to the page;
- stores loading and error state;
- updates cached content after save/import/publish.

Current page using it:

```text
src/app/features/materials/pages/materials/materials.ts
```

This page also extends:

```text
src/app/shared/components/base.component.ts
```

## Adding A New Feature

Example: `products`.

Create:

```text
src/app/features/products/domain/product.model.ts
src/app/features/products/services/product.service.ts
src/app/features/products/state/products.store.ts
src/app/features/products/pages/products-page/products-page.ts
src/app/features/products/components/product-card/product-card.ts
src/app/features/products/products.routes.ts
```

Connection:

```text
products.routes.ts
  -> ProductsPage
  -> ProductsStore
  -> ProductService
  -> Backend API
```

After creating the route, add lazy route loading in `src/app/app.routes.ts`.

## Comments Rule

Use the same style as backend:

```ts
// use of this is:
// Explains why this method/state/helper exists and how it connects to the next layer.
```

Comment:

- store methods;
- computed values;
- API service methods;
- complex component methods;
- mappers;
- guards/interceptors.

Do not comment obvious one-line property declarations unless the value has architecture meaning.

## Build Commands

From inside `client`:

```bash
npm run build
npm start
```

From project root:

```bash
npm --prefix client run build
npm --prefix client start
```
