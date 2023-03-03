# Using your own decorator

Create your own decorator to avoid coupling your inner architecture layers with DIOD. It does not need to do anything, but [without decorators Typescript won't emit constructor metadata](https://www.typescriptlang.org/tsconfig#emitDecoratorMetadata).

```ts
export const MyAppService = (): ClassDecorator => {
  return <TFunction extends Function>(target: TFunction): TFunction => {
    return target
  }
}
```

Use it on your services:

```ts
import { MyAppService } from './my-app-service'

@MyAppService()
export class MyService {
  constructor(/* ... */) {}

  //...
}
```

Register your services in the normal way:

```ts
import { ContainerBuilder } from 'diod'
// Other imports...

const builder = new ContainerBuilder()
builder.registerAndUse(MyService)
// ...
export const container = builder.build()
```
