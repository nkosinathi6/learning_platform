# Copilot Instructions

## Scope
- This file defines rules for Angular frontend work only.
- Do not generate backend code, server routes, or database logic unless explicitly requested.

## Tech Stack
- Frontend: Angular with TypeScript.
- Architecture: Standalone components, feature-first folder organization.
- State: Start simple with services and signals; introduce NgRx only when complexity requires it.

## Angular Implementation Rules (Required)
- Use Angular modern control flow syntax in templates:
	- Prefer `@if (...) { ... }` over `*ngIf`.
	- Prefer `@for (...; track ...) { ... }` over `*ngFor`.
	- Prefer `@switch (...) { @case (...) { ... } @default { ... } }` over `*ngSwitch`.
- Keep component template and logic separate:
	- Use external template files (`.html`) and style files (`.css` or `.scss`).
	- Do not use inline templates for production components unless explicitly requested.
- Keep components small and focused. Move business logic to services.
- Use strong typing everywhere and avoid `any` unless unavoidable.
- Use Angular dependency injection and avoid manual singleton patterns.
- Prefer reactive patterns (RxJS/signals) over imperative DOM manipulation.

## Coding Standards
- Follow single responsibility per component/service.
- Reuse shared logic through:
	- `src/core/services`
	- `src/core/guards`
	- `src/core/interceptors`
	- `src/core/pipes`
	- `src/shared`
- Use clear naming conventions:
	- Components: `feature-name.component.ts`
	- Services: `feature-name.service.ts`
	- Guards: `feature-name.guard.ts`
	- Interceptors: `feature-name.interceptor.ts`
	- Models/types: `feature-name.model.ts` or `feature-name.types.ts`

## Testing Standards
- Write tests for all new or changed:
	- Components
	- Services
	- Guards
	- Interceptors
	- Pipes
- Frontend tests must use Jest and Angular Testing Library.
- Maintain at least 80% code coverage overall.
- Do not merge untested behavior changes.

## Project Structure
- `project/src/features/`: Feature modules and feature-specific UI.
- `project/src/core/`: App-wide singleton/cross-cutting logic.
- `project/src/core/services/`: API and shared business services.
- `project/src/core/guards/`: Route and auth guards.
- `project/src/core/interceptors/`: HTTP interceptors.
- `project/src/core/pipes/`: Reusable pipes.
- `project/src/shared/`: Shared/reusable components and utilities.
- `project/src/environments/`: Environment configuration files.
- `project/src/types/`: Shared frontend types/interfaces.

## API Integration Rules
- Keep all API calls inside services (not inside components).
- Centralize base URL and environment-dependent endpoints in `src/environments`.
- Use interceptors for auth headers and common HTTP error handling.

## What To Avoid
- Avoid `*ngIf`, `*ngFor`, and `*ngSwitch` in new code when modern control flow is available.
- Avoid inline HTML templates in `.ts` component files.
- Avoid placing HTTP calls directly inside components.
- Avoid introducing NgRx for simple state use cases.

## Output Expectations For Copilot
- When proposing a change, include corresponding tests.
- When unsure between multiple approaches, choose the simplest approach that keeps the code maintainable and testable.
