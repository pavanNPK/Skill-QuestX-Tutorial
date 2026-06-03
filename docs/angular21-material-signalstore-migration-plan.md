# Angular 21, SignalStore, Angular Material Migration Plan

## Decision Summary

- Use Angular 21 as the framework target.
- Use NgRx SignalStore, not classic action/reducer/effects NgRx, as the main application state pattern.
- Replace PrimeNG with Angular Material feature by feature, starting with the app shell and auth flows.
- Keep server API services as thin HTTP adapters; move shared client state and async loading/error state into feature stores.
- Treat Angular AI as two separate concerns:
  - development AI: Angular CLI MCP server for Angular-aware code generation and docs lookup;
  - product AI: a backend-proxied AI feature, added only when there is a concrete user workflow.

## Target Folder Structure

```text
client/src/app/
  core/
    auth/
      auth.api.ts
      auth.store.ts
      auth.types.ts
      auth.guard.ts
      auth.interceptor.ts
    layout/
      app-shell/
      header/
      sidenav/
    notifications/
      notification.service.ts
      snackbar.service.ts
    http/
      dedupe.interceptor.ts
      loader.interceptor.ts
    ai/
      ai.api.ts
      ai.store.ts
      ai.types.ts

  features/
    dashboard/
      dashboard.routes.ts
      dashboard.page.ts
      dashboard.page.html
      dashboard.page.scss
      dashboard.store.ts
    courses/
      data-access/
        courses.api.ts
        courses.store.ts
        courses.types.ts
      pages/
      ui/
    materials/
      data-access/
      pages/
      ui/
    classes/
      data-access/
      pages/
      ui/
    tasks/
      data-access/
        tasks.api.ts
        tasks.store.ts
        tasks.types.ts
      pages/
      ui/
    exams/
      data-access/
        exams.api.ts
        exams.store.ts
        exams.types.ts
      pages/
      ui/
    users/
      data-access/
        users.api.ts
        users.store.ts
        users.types.ts
      pages/
      ui/

  shared/
    ui/
      empty-state/
      confirm-dialog/
      data-table/
      file-dropzone/
      password-field/
    utils/
    validators/
    models/

  app.config.ts
  app.routes.ts
```

## Migration Phases

### Phase 1: Angular 21 Upgrade

Run from `client/`:

```bash
npm install
npx ng update @angular/cli@^21 @angular/core@^21
npm run build
npm test
```

Then update Angular Material after the framework is on Angular 21:

```bash
npx ng add @angular/material@^21
```

Use a custom SCSS theme instead of a prebuilt theme so the application can keep its Skill QuestX colors.

### Phase 2: Remove PrimeNG From Root

Replace root PrimeNG providers and toast usage:

- Remove `providePrimeNG` and Aura theme from `app.config.ts`.
- Replace `MessageService` usage with a small `SnackbarService` around `MatSnackBar`.
- Replace `<p-toast />` in `app.html` with no root UI; Angular Material snackbars are service-driven.
- Remove PrimeNG global style imports from `angular.json`.
- Replace `styles/_primeng-overrides.scss` and `styles/_primeng-forms-primary.scss` with Material theme styles.

Do not remove PrimeNG packages until all feature imports are gone.

### Phase 3: SignalStore Foundation

Install:

```bash
npm install @ngrx/signals@^21
```

Use stores like this:

```ts
export const AuthStore = signalStore(
  { providedIn: 'root' },
  withState<AuthState>(initialAuthState),
  withComputed((store) => ({
    isAuthenticated: computed(() => !!store.token()),
    role: computed(() => store.user()?.role ?? null),
  })),
  withMethods((store, api = inject(AuthApi), router = inject(Router)) => ({
    async login(payload: LoginRequest) {
      patchState(store, { status: 'loading', error: null });
      try {
        const result = await firstValueFrom(api.login(payload));
        patchState(store, {
          token: result.access_token,
          user: result.user,
          status: 'loaded',
        });
        router.navigateByUrl('/dashboard');
      } catch (error) {
        patchState(store, { status: 'error', error: toErrorMessage(error) });
      }
    },
  })),
);
```

Recommended state shape:

```ts
export type CallStatus = 'idle' | 'loading' | 'loaded' | 'error';

export interface AuthState {
  token: string | null;
  user: AuthUser | null;
  status: CallStatus;
  error: string | null;
}
```

### Phase 4: Auth First

Move current auth state out of `AuthService.currentUser` and into `AuthStore`.

Keep persistence isolated:

- `AuthApi` handles HTTP only.
- `AuthStorage` handles `localStorage`.
- `AuthStore` coordinates login/register/logout/bootstrap.
- guards read `AuthStore.isAuthenticated()`.
- navbar/header read `AuthStore.user()` and computed permission signals.

This removes duplicated role logic from components.

### Phase 5: Angular Material App Shell

Convert shell before feature pages:

- `HeaderComponent`: `MatToolbar`, `MatIconButton`, `MatBadge`, `MatMenu`.
- `NavbarComponent`: `MatSidenav`, `MatNavList`, `MatExpansionPanel` or custom nav groups.
- loader: keep existing custom loader unless a Material progress bar is enough.
- profile menu: replace PrimeNG `PopoverModule` with `MatMenu`.

### Phase 6: Feature-by-Feature PrimeNG Replacement

Convert in this order:

1. Auth pages: login, register, forgot password, set password, change password, profile settings.
2. Users page: table, select, multiselect, chips, tooltips.
3. Tasks and materials: table, dialog, confirm dialog, datepicker, drawer.
4. Batches and courses: cards, avatars, carousel/search.
5. Exams: forms and assessment UI.
6. Dashboard and syllabus: carousel and accordion.
7. Delete the PrimeNG utilities demo route or rewrite it as a Material demo.

Component mapping:

```text
PrimeNG ButtonModule        -> MatButtonModule
InputTextModule             -> MatInputModule
PasswordModule              -> custom password field using MatFormField + MatIconButton
FloatLabelModule            -> MatFormField appearance="outline"
SelectModule                -> MatSelectModule
MultiSelectModule           -> MatSelectModule multiple
TableModule                 -> MatTableModule + MatSort + MatPaginator
ToastModule/MessageService  -> MatSnackBar
ConfirmDialogModule         -> MatDialog
DialogModule                -> MatDialog
DrawerModule                -> MatSidenav
TagModule                   -> MatChipsModule or custom status badge
ChipModule                  -> MatChipsModule
TooltipModule               -> MatTooltipModule
AvatarModule                -> custom avatar component
AccordionModule             -> MatExpansionModule
DatePickerModule            -> MatDatepickerModule
CarouselModule              -> custom CSS carousel or CDK carousel alternative
PopoverModule               -> MatMenu or CDK Overlay
BadgeModule                 -> MatBadgeModule
BreadcrumbModule            -> custom breadcrumb component
```

### Phase 7: Feature Stores

Use one SignalStore per real feature data domain:

- `AuthStore`: token, user, permissions, bootstrap.
- `UsersStore`: admin/instructor/student lists, status changes, head permission changes.
- `CoursesStore`: courses list, course creation, assigned courses.
- `CourseContentStore`: available content, selected content, draft/publish/import/upload states.
- `TasksStore`: task list, selected task, submission and management state.
- `ExamsStore`: available exams, managed exams, selected exam, submission state.
- `NotificationsStore`: notification list, unread count, push registration status.

Avoid global stores for purely local UI state such as a single dialog open flag, a temporary form, or a one-page filter.

### Phase 8: Angular 21 AI

Angular 21 does not automatically add AI into the app. The useful Angular 21 AI additions are mostly development tooling and integration guidance.

Recommended development AI setup:

```bash
npx ng mcp
```

Then configure the Angular CLI MCP server in the IDE. This gives AI tools access to Angular-aware commands, documentation search, best-practice guidance, examples, and optional modernization tools.

Recommended product AI setup:

- Add server endpoint: `POST /api/ai/...`
- Keep API keys only in the server environment.
- Add `client/src/app/core/ai/ai.api.ts`.
- Add `AiStore` only when AI state is reused across a workflow.
- Start with one useful feature, for example:
  - summarize course material;
  - generate exam practice questions;
  - suggest task feedback;
  - explain a failed assessment answer.

Do not call AI provider APIs directly from Angular.

## Done Criteria

- `npm run build` succeeds in `client/`.
- No imports from `primeng/*` or `@primeng/*` remain.
- No PrimeNG styles remain in `angular.json` or global SCSS.
- `AuthService.currentUser` signal is removed or replaced by `AuthStore`.
- Route guards use `AuthStore`.
- Material theme is defined in SCSS and loaded globally.
- Each migrated feature has no PrimeNG templates.
- AI setup is documented and server-proxied if a product AI feature is added.
