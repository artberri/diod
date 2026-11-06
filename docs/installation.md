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
