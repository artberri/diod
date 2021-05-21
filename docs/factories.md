# Registering factories to create instances

You can register factories to create complex instances. Imagine you have these services:

```ts
export abstract class Logger {
  //...
}
export class ConsoleLogger implements Logger {
  //...
}
```

```ts
export class MyDatabase {
  constructor(
    private readonly connectionString: string,
    private readonly logger: Logger
  ) {}
  //...
}
```

You will be able to register them like this:

```ts
import { ContainerBuilder } from 'diod'
// Other imports...

const builder = new ContainerBuilder()
// ...
builder.register(Logger).use(ConsoleLogger)
builder.register(MyDatabase).useFactory((c) => {
  return new MyDatabase('my-connection-string', c.get(Logger))
})
// ...
const container = builder.build()
// ...
```

Now you will be able to query MyDatabase normally and it will also be injected like
any other dependency if some service request it on its constructor.
