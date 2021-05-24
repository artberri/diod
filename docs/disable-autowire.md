# Disabling autowire (or declaring dependencies manually)

DIOD will be able to autowire dependencies based on the construtors' parameter types of the registered services. This is the default behaviour, but you can disable it.

## Disabling autowiring for specific services

Service dependencies can be set manually using the method `.withDependencies(dependencies: Identifier[])`, this is the way to disable autowiring for a specific services.

```ts
import { ContainerBuilder } from 'diod'
// Other imports...

const builder = new ContainerBuilder()
builder.registerAndUse(ServiceOne).withDependencies([ServiceTwo, ServiceThree]) // <- autowire disabled
builder.register(ServiceTwo).use(ImplementationServiceTwo).withDependencies([]) // <- autowire disabled
builder.register(ServiceThree).use(ImplementationServiceThree) // <- autowire enabled
builder.registerAndUse(ServiceFour) // <- autowire enabled
export const container = builder.build()
```

## Disabling autowiring for all services

You can disable autowiring for all services during the build of the container: `.build({ autowire: false })`. If you do so, you will need to declare all service dependencies with the `.withDependencies(dependencies: Identifier[])` method. This is the way DIOD works [with vanilla JavaScript](./javascript.md).

```ts
import { ContainerBuilder } from 'diod'
// Other imports...

const builder = new ContainerBuilder()
builder.registerAndUse(ServiceOne).withDependencies([ServiceTwo, ServiceThree])
builder.register(ServiceTwo).use(ImplementationServiceTwo)
builder
  .register(ServiceThree)
  .use(ImplementationServiceThree)
  .withDependencies([ServiceFour])
builder.registerAndUse(ServiceFour)
export const container = builder.build({ autowire: false }) // Note the autowire: false build option
```
