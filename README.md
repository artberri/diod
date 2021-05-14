# DIoD

A very opinionated inversion of control (IoC) container and dependency injector for Node.js or browser apps. It is available for vanilla Javascript usage but its true power will be shown by building Typescript apps.

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
    // ...
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true
  }
}
```

Add a polyfill for the Reflect API (example below use reflect-metadata). You can use:

- [reflect-metadata](https://www.npmjs.com/package/reflect-metadata)
- [core-js (core-js/es7/reflect)](https://www.npmjs.com/package/core-js)
- [reflection](https://www.npmjs.com/package/@abraham/reflection)

The Reflect polyfill import should be added only once in your code base, and before DIoD is used:

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
// domain/UserRepository.ts
export abstract class UserRepository {
  public create(userData: UserDto): User
  public findBy(userData: UserCriteria): User[]
}
```

## Why

Todo:

- auto registration
- register Factory
- registerAs
- public private
- transient, singleto, per request

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
