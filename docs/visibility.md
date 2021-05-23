# Register private services

Services can be marked as private. Private services will be available only as dependencies and they will not be able to be queried from the IoC container. Services are public by default, to register them as private you need to call the `.private()` method:

```ts
const builder = new ContainerBuilder()
// ...
builder.registerAndUse(Whatever).private()
// or
builder
  .register(Whatever)
  .useFactory((c) => {
    return new Whatever(/**/)
  })
  .private()
// or
builder.register(Whatever).useInstance().private()
// ...
const container = builder.build()
```
