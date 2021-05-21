# Injecting classes

Imagine you have these services:

```ts
import { Service } from 'diod'

@Service()
export class ServiceOne {
  constructor(
    private readonly dep1: ServiceTwo,
    private readonly dep2: ServiceThree
  ) {}

  //...
}
```

```ts
import { Service } from 'diod'

@Service()
export class ServiceTwo {
  constructor(private readonly dep1: ServiceFour) {}

  //...
}
```

```ts
import { Service } from 'diod'

@Service()
export class ServiceThree {
  //...
}
```

```ts
import { Service } from 'diod'

@Service()
export class ServiceFour {
  //...
}
```

You will need to register them like this:

```ts
import { ContainerBuilder } from 'diod'
// Other imports...

const builder = new ContainerBuilder()
builder.registerAndUse(ServiceOne)
builder.registerAndUse(ServiceTwo)
builder.registerAndUse(ServiceThree)
builder.registerAndUse(ServiceFour)
// This is the shortcut for:
// builder.register(ServiceOne).use(ServiceOne)
// builder.register(ServiceTwo).use(ServiceTwo)
// builder.register(ServiceThree).use(ServiceThree)
// builder.register(ServiceFour).use(ServiceFour)
export const container = builder.build()
```

Now you will be able to query any of your services and they will be automatically built:

```ts
const serviceOne = container.get(ServiceOne)
const serviceTwo = container.get(ServiceTwo)
const serviceThree = container.get(ServiceThree)
const serviceFour = container.get(ServiceFour)
```
