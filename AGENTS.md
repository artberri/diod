# DIOD

DIOD is a dependency injection container for TypeScript and JavaScript, published to npm as `diod`. It has strong opinions about how injection should work, and those opinions limit which changes fit the library. Read the design rules below before you add a feature or change public behaviour.

## Design rules

- **No runtime dependencies, and the bundle stays under 2 kB.** `pnpm run build` checks the size with size-limit. Little room is left, so when two designs work, choose the smaller one.
- **Services are identified only by classes.** An identifier is a concrete class or an abstract class, never a string or symbol token. Abstractions are abstract classes because TypeScript interfaces don't exist at runtime. Dependencies come in only through the constructor.
- **Autowiring needs TypeScript's legacy decorators.** With `experimentalDecorators` and `emitDecoratorMetadata` on, TypeScript writes `design:paramtypes`, and autowiring reads it. Standard (TC39) decorators don't write parameter metadata, so keep the legacy ones.
- **`@Service()` does nothing on purpose.** Its only job is to make TypeScript write the metadata, and users can use any class decorator instead, which keeps their domain layer free of DIOD. New behaviour goes into `ContainerBuilder` registration options, not into a decorator.
- **Every feature also works in plain JavaScript.** Without decorators, dependencies are declared by hand with `withDependencies([...])` (`docs/javascript.md`).

## How the code fits together

`ContainerBuilder.register()` creates a `DiodRegistration`. `use()`, `useFactory()` or `useInstance()` attaches a class, factory or instance configuration (`src/configurations/`). `build()` turns each registration into `ServiceData`, and `verify()` checks for missing dependencies and circular dependencies. The result is an immutable `DiodContainer`, which applies each service's scope when `get()` is called.

- The public API is exactly what `src/diod.ts` re-exports. `internal-types.ts` and the configuration classes are internal.
- Each `createBuildable()` returns `{ instance, build }`, so `build` is never part of the chainable public methods. A new kind of registration does the same.

## Checks

- `pnpm run qa` runs lint, type-check and tests. A change is done when it passes. The pre-commit hook runs it too, once `git config core.hooksPath .githooks` is set.
- Run `pnpm run build` after changing `src/`. It bundles `lib/` and fails if the bundle goes over the size limit.
- `pnpm exec biome check --write` fixes formatting and import order.
- `pnpm run test` requires 100% coverage: if coverage is lower, the run fails even when every test passes. While you work, run single files without coverage (`pnpm exec vitest run test/scope.ts`), and finish with a full `pnpm run qa`.

## Tests

- Each feature has one test file in `test/`. Classes shared between tests go in `test/fixtures/`. Vitest only runs `test/*.ts`, so a test file put in `test/fixtures/` never runs.
- Tests import `reflect-metadata` first and then use only `../src/diod`. Internal code gets its coverage through the public API.
- Fix bugs test-first: write a test that fails because of the bug, then fix it.

## Docs and changelog

- User docs are `README.md` (overview, quick start, feature list) plus one page per feature in `docs/`, listed in `docs/README.md`. A new feature needs its page, a line in that list, and a bullet in the README feature list.
- `docs/api/` is generated from the doc comments (TSDoc) on exported code. To change it, edit the comments in `src/` and run `pnpm run docs`.
- `CHANGELOG.md` follows Keep a Changelog. Add changes users will notice under `## [Unreleased]`, and create that heading above the latest release if it's missing. The maintainer sets versions and release dates.
- Commit messages follow Conventional Commits. `commitlint.config.cjs` lists the allowed types and the 72-character limit for the first line.
