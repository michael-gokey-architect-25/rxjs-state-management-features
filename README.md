
# Angular Jest Starter (Standalone, Angular 20 + Material)

This starter demonstrates a minimal Angular 20 project using **standalone components**, **Angular Material**, and **Jest** for unit testing.

## Project goals
- Standalone components (no NgModules) to showcase Angular 20 modern style.
- Central `app.routes.ts` consumed by `main.ts` via `provideRouter(...)`.
- Angular Material provided at bootstrap via `importProvidersFrom(...)`.
- Jest setup (`jest-preset-angular`) for fast, isolated unit tests.
- Small example routes: `/hello` and `/users`.

## Important files
- `src/main.ts` — application bootstrap (providers, Material, router).
- `src/app/app.routes.ts` — central route definitions.
- `src/app/app.component.ts` — root standalone component with `router-outlet`.
- `src/app/components/hello/hello.component.ts` — simple presentational component to verify routing.
- `src/app/components/user-list/user-list.component.ts` — standalone component that fetches users (can be refactored to use `UserService`).
- `src/app/services/user.service.ts` — optional, recommended for separation of concerns.
- `jest.config.ts`, `setup-jest.ts`, `tsconfig.spec.json` — Jest configuration and setup.

## Running locally
1. Install dependencies:
   ```bash
   npm install





--------------------------------
Notes:

**AngularJestStarter**

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.3.7.

**Development server**

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

**Code scaffolding**

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

**Building**

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

**Running unit tests**

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

**Running end-to-end tests**

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

**Additional Resources**

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
