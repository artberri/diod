# Injecting externally created instances

You can register classes and use instances created by yourself. Imagine you have these services:

```ts
export abstract class Logger {
  //...
}
export class ConsoleLogger implements Logger {
  //...
}
```

```ts
export class Mailer {
  //...
}
```

You will need to register them like this:

```ts
import { ContainerBuilder } from 'diod'
// Other imports...

const logger = new ConsoleLogger(/**/)
const mailer = new Mailer(/**/)

const builder = new ContainerBuilder()
// ...
builder.register(Logger).useInstance(logger)
builder.register(Mailer).useInstance(mailer)
// ...
const container = builder.build()
// ...
```

Now you will be able to query any of the services normally and they will be injected like
any other dependency if some service request them on its constructor.
