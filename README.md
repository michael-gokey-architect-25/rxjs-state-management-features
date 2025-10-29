
# RxJS State Management Design Demo ⚡️ 

rxjs-state-management-features

https://stackblitz.com/edit/rxjs-state-management-features

behavior-subject-observables-operators





## **App Concept: "Task Manager with Real-time Filters"**

This would demonstrate all key RxJS v7 patterns:


**Features to showcase:**
1. **BehaviorSubject** for state store
2. **Observables** for async operations
3. **Operators** (map, filter, combineLatest, debounceTime, distinctUntilChanged)
4. **Derived state** (computed values from multiple streams)
5. **Optimistic updates** (UI updates before API)
6. **Error handling** with catchError
7. **Memory management** with proper unsubscription

## Project goals
- Standalone components (no NgModules) to showcase Angular 20 modern style.
- Central `app.routes.ts` consumed by `main.ts` via `provideRouter(...)`.
- Angular Material provided at bootstrap via `importProvidersFrom(...)`.
- Jest setup (`jest-preset-angular`) for fast, isolated unit tests.


## Important files
- `src/main.ts` — application bootstrap (providers, Material, router).
- `src/app/app.routes.ts` — central route definitions.
- `src/app/app.component.ts` — root standalone component with `router-outlet`.
- `jest.config.ts`, `setup-jest.ts`, `tsconfig.spec.json` — Jest configuration and setup.


### **Architecture:**

```
TaskStateService (RxJS Store)
├── Private BehaviorSubjects (state)
├── Public Observable streams (read-only)
├── Action methods (write operations)
└── Derived/computed observables (selectors)
```



### **Components:**
1. **Task List Component** - displays filtered tasks
2. **Task Form Component** - adds/edits tasks
3. **Filter Component** - search + status filter (active/completed)
4. **Stats Component** - shows counts (demonstrates derived state)

