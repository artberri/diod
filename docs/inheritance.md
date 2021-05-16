# Inheritance

Imagine you have this service, which doesn't have a constructor but it extends a class that has some constructor dependencies:

```ts
import { Service } from 'diod'

@Service()
export class SomeClass extends BaseClass {
  // only members not constructor here...
}
```

The base class will need to be decorated because without the decorator typescript won't emit the metadata needed to identify and autowire the dependencies.

```ts
import { Service } from 'diod'

@Service()
export class BaseClass {
  constructor(private readonly dep: Dependency) {}

  //...
}
```

You don't need to register the base class, only the dependencies and the classes that will be queried:

```ts
import { ContainerBuilder } from 'diod'
// Other imports...

const builder = new ContainerBuilder()
builder.registerAndUse(SomeClass)
builder.registerAndUse(Dependency)
// ...
export const container = builder.build()
const something = container.get(SomeClass)
```
