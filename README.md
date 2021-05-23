# DIoD

[![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-2.0-4baaaa.svg)](./CODE_OF_CONDUCT.md)
[![MIT license](https://img.shields.io/npm/l/diod)](./LICENSE)
[![Build status](https://github.com/artberri/diod/actions/workflows/qa.yml/badge.svg)](https://github.com/artberri/diod/actions)
[![codecov](https://codecov.io/gh/artberri/diod/branch/main/graph/badge.svg?token=AGYQWMUQCA)](https://codecov.io/gh/artberri/diod)

## About

A very opinionated and lightweight (under 2kB minified and gzipped) inversion of control container and dependency injector for Node.js or browser apps. It is available for vanilla Javascript usage but its true power will be shown by building Typescript apps.

[Quick Start Guide](#quick-start-guide) |
[Documentation](./docs/README.md) |
[Contributing](./CONTRIBUTING.md)

### Motivation

> 💡 Do not want to waste your time on unnecessary documentation? Jump to the [Quick Start Guide](#quick-start-guide).

These are the reasons that have led me to reinvent the wheel and create DIoD:

- I don't like the string-based solutions that current Typescript dependency injection libraries use to bypass the Typescript compiler inabilty to emit Javascript constructs. DIoD autowiring will always be based on constructor typings and property injection will be avoided, even when it implies to work with abstract classes instead of interfaces.
- I don't like to couple my domain or application layers (see [hexagonal arquitecture](<https://en.wikipedia.org/wiki/Hexagonal_architecture_(software)>)) with a dependency injection library. Despite DIoD provides a decorator for ease of usage, you are encouraged to [create and use your own](.docs/custom-decorator.md) keeping your inner layers free of DIoD.

Both reasons are related with some TypeScript constraints: whenever you want to work with type information in runtime (in compiled JS), you inevitably need to use decorators. Even so, you won't be able to have information about interfaces at runtime.

It might sound ridiculous but [Typescript needs types](https://www.typescriptneedstypes.com).

### Features

- **Autowire**  
  When you ask for a service, DIoD reads the type-hints on your constructor and automatically passes the correct service dependencies to it. The same process will be used to create the required dependencies.
- **Custom decorators**  
  DIoD requires decorators for dependency guessing while autowiring, but it accepts any class decorator if you don't want to use the one it provides.
- **Compiler**  
  After all needed services are registered the container needs to be built. During this build, DIoD will check for errors like missing dependencies, wrong configurations or circular dependencies. An inmutable container will be finally created if there aren't any errors in the building.
- **Support for vanilla JS**  
  Usage with vanilla Javascript is possible by manually defining service dependencies.
- **Multiple containers**  
  It is possible to create multiple IoC containers.
- **Factory**  
  Using a factory to create services.
- **Instance**  
  Using a manually created instance to define a service.
- **Scope**  
  By default every service is transient, but they can be registered as singletons or as 'per request' (the same instance of a service will be used within a single request).
- **Visibility**  
  Services can be marked as private. Private services will be available only as dependencies and they will not be able to be queried from the IoC container.

#### Coming soon

- **Tagging**  
  Ability to tag services in the container and to query services based on tags.
- **Auto registration**  
  A global option that will enable to use service without registering them in the container.

## Quick Start Guide

### Installation

```sh
npm install diod
# or
yarn add diod
```

#### Usage with Typescript

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

The Reflect polyfill import should be added only once in your code base and before DIoD is used:

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

### Basic usage

All the registered services must be decorated because [this is the only way to make type metadata available at runtime](https://www.typescriptlang.org/tsconfig#emitDecoratorMetadata) in Typescript. DIoD provides the `@Service()` decorator for ease of usage, but you can [create your own decorator](./docs/custom-decorator.md) to avoid coupling your inner arquitecture layers with DIoD.

Imagine that you want to have a class like this:

```ts
// application/use-cases/SignUpUseCase.ts
import { Service } from 'diod'

@Service()
export class SignUpUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly mailer: Mailer
  ) {}

  execute(userData: UserDto): void {
    const user = this.userRepository.create(userData)
    this.mailer.sendConfirmationEmail(user)
  }
}
```

The **D** of the [SOLID](https://en.wikipedia.org/wiki/SOLID) principles refers to [dependency inversion](https://en.wikipedia.org/wiki/Dependency_inversion_principle). This principle encourages developers to use abstractions to define dependencies in certain situations. Abstractions are usually defined with interfaces in other languages, but Typescript interfaces are not available at runtime and that's why DIoD requires abstract classes for abstractions if you want them to be autowired. More information available in the [Motivation](#motivation) section.

```ts
// application/services/Mailer.ts
export abstract class Mailer {
  sendConfirmationEmail(userData: user): void
  sendResetPasswordEmail(userData: user): void
}
```

```ts
// domain/UserRepository.ts
export abstract class UserRepository {
  create(userData: UserDto): User
  findBy(userData: UserCriteria): User[]
}
```

Finally, we need to create a configuration file where we will register every dependency of our app. This should be the only place where our dependencies will be coupled with a concrete implementation. We use to name this file as `diod.config.ts`.

```ts
// infrastructure/diod.config.ts
import { ContainerBuilder } from 'diod'
// Other imports...

const builder = new ContainerBuilder()
builder.register(Mailer).use(AcmeMailer)
builder.register(UserRepository).use(SqliteUserRepository)
builder.registerAndUse(SignUpUseCase) // This is an alias of builder.register(SignUpUseCase).use(SignUpUseCase)
const container = builder.build()

const signUpUseCase = container.get(SignUpUseCase)
signUpUseCase.execute({
  /* ... */
})
```

The previous usage example assumes that you have some concrete implementations of the `Mailer` and the `UserRepository` abstractions. _Note that abstract classes do not need to be extended and can be implemented just like an interface._

```ts
// infrastructure/AcmeMailer.ts
import { Service } from 'diod'
import { Mailer } from '../application/services/Mailer'

@Service()
export class AcmeMailer implements Mailer {
  sendConfirmationEmail(userData: user): void {
    // ...
  }
  sendResetPasswordEmail(userData: user): void {
    // ...
  }
}
```

```ts
// domain/SqliteUserRepository.ts
import { Service } from 'diod'
import { UserRepository } from '../domain/UserRepository'

@Service()
export class SqliteUserRepository implements UserRepository {
  create(userData: UserDto): User {
    // ...
  }
  findBy(userData: UserCriteria): User[] {
    // ...
  }
}
```

More usage information in the [official documentation](./docs/README.md).

## Acknowledgements

A special thanks to every open source contributor that helped or inspired me to create DIoD, including but not limited to all the contributors of the following libraries: [InversifyJS](https://github.com/inversify/InversifyJS), [Node Dependency Injection](https://github.com/zazoomauro/node-dependency-injection), [TSyringe](https://github.com/microsoft/tsyringe), [Autofac](https://github.com/autofac/Autofac), [Ninject](https://github.com/ninject/Ninject) and the [Symfony DependencyInjection Component](https://github.com/symfony/dependency-injection)

## Pronunciation and name origin

DIoD will be pronounced like the English word 'diode' _/ˈdaɪəʊd/_. DIoD is the abbreviation of **Dependency Injection or Die**, which is the first and only thing I was able to elaborate after I realised that the short `diod` package name was free on the NPM registry.

## License

DIoD is released under the MIT license:

MIT License

Copyright (c) 2021 Alberto Varela Sánchez

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
