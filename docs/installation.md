# Installation

Get the latest release using npm:

```sh
npm install diod
```

Or using yarn

```sh
yarn add diod
```

Or from [JSR](https://jsr.io/@artberri/diod), where it is published as `@artberri/diod`. Import it from `@artberri/diod` instead of `diod`:

```sh
# Deno
deno add jsr:@artberri/diod
# Node.js, Bun and others
npx jsr add @artberri/diod
```

## Usage with Typescript

Modify your `tsconfig.json` to include the following settings

```json
{
  "compilerOptions": {
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true
  }
}
```

The compiler that runs your code must honour `emitDecoratorMetadata`, because autowiring reads the constructor parameter types that it writes. `tsc`, `ts-node` and SWC (with `jsc.transform.decoratorMetadata` enabled) write them. esbuild doesn't, and neither do the tools built on it, such as `tsx` and the default Vite and Vitest setups. Without the metadata, `build()` throws `Service not decorated: YourService` even though the class is decorated. If you can't change the compiler, use SWC in place of esbuild (for example with `unplugin-swc` in Vite or Vitest), or declare dependencies by hand with `withDependencies([...])` as in [Using vanilla JavaScript](./javascript.md).

Add a polyfill for the Reflect API (example below use reflect-metadata). You can use:

- [reflect-metadata](https://www.npmjs.com/package/reflect-metadata)
- [core-js (core-js/es7/reflect)](https://www.npmjs.com/package/core-js)
- [reflection](https://www.npmjs.com/package/@abraham/reflection)

The Reflect polyfill import should be added only once in your code base and before DIOD is used:

```sh
npm install reflect-metadata
# or
yarn add reflect-metadata
```

```ts
// main.ts
import 'reflect-metadata'

// Your code here...
```
