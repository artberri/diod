# Using abstractions to define your dependencies

The **D** of the [SOLID](https://en.wikipedia.org/wiki/SOLID) principles refers to [dependency inversion](https://en.wikipedia.org/wiki/Dependency_inversion_principle). This principle encourages developers to use abstractions to define dependencies in certain situations. Abstractions are usually defined with interfaces in other languages, but Typescript interfaces are not available at runtime and that's why DIoD requires abstract classes for abstractions if you want them to be autowired.

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

With these abstractions:

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

And these concrete classes:

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

You will need to register them like this:

```ts
// infrastructure/diod.config.ts
import { ContainerBuilder } from 'diod'
// Other imports...

const builder = new ContainerBuilder()
builder.register(Mailer).use(AcmeMailer)
builder.register(UserRepository).use(SqliteUserRepository)
builder.registerAndUse(SignUpUseCase)
const container = builder.build()

const signUpUseCase = container.get(SignUpUseCase)
signUpUseCase.execute({
  /* ... */
})
```
