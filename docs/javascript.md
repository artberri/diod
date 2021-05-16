# Using vanilla JavaScript

DIoD's true power will be shown by building Typescript apps, but you can use it with vanilla JS also. The downside is that you will need to manually define all dependencies because without typing information DIoD won't be able to discover them from the constructors of the registered services.

Imagine you have these services:

```ts
export class ServiceOne {
  constructor(
    private readonly dep1: ServiceTwo,
    private readonly dep2: ServiceThree
  ) {}

  //...
}

export class ServiceTwo {
  constructor(private readonly dep1: ServiceFour) {}

  //...
}

export class ServiceThree {
  //...
}

export class ServiceFour {
  //...
}
```

You will need to register them and provide their dependencies explicitly:

```ts
import { ContainerBuilder } from 'diod'
// Other imports...

const builder = new ContainerBuilder()
builder.registerAndUse(ServiceOne).withDependencies([ServiceTwo, ServiceThree])
builder.registerAndUse(ServiceTwo).withDependencies([ServiceFour])
builder.registerAndUse(ServiceThree)
builder.registerAndUse(ServiceFour)
export const container = builder.build({ autowire: false }) // Note the autowire: false build option
```

Now you will be able to query any of your services and they will be automatically built:

```ts
const serviceOne = container.get(ServiceOne)
const serviceTwo = container.get(ServiceTwo)
const serviceThree = container.get(ServiceThree)
const serviceFour = container.get(ServiceFour)
```
