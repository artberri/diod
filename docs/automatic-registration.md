# Automatic registration

All the classes that you are registering directly, i.e. those that you are
planning to register with `registerAndUse` can be automatically registered
with a [custom decorator](./custom-decorator.md).

To do so, create this file in your project:

```ts
// autoregister.ts

import { ContainerBuilder, Newable } from 'diod'

const autoregisteredClasses: Newable<unknown>[] = []

const isNewable = (target: unknown): target is Newable<unknown> => {
  if (typeof target !== 'function') {
    return false
  }

  const prototype = target.prototype
  return !!prototype && !!prototype.constructor
}

export const RegisterService = (): ClassDecorator => {
  return <TFunction extends Function>(target: TFunction): TFunction => {
    if (isNewable(target)) {
      autoregisteredClasses.push(target)
    } else {
      throw new Error('Abstract classes cannot be auto registered')
    }

    return target
  }
}

export const autoregister = (builder: ContainerBuilder): ContainerBuilder => {
  for (const service of autoregisteredClasses) {
    builder.registerAndUse(service)
  }

  return builder
}
```

Once you have created it you can just use the custom decorator instead of the
default one and register all the classes automatically like this:

```ts
import { ContainerBuilder } from 'diod'
import { autoregister } from './autoregister'

const builder = new ContainerBuilder()
autoregister(builder)
// ...
const container = builder.build()
// ...
```
