# Scope of the dependencies

Instance scope determines how an instance is shared between requests for the same service. When a request is made for a service, DIoD can return a new instance (transient) which is the default behaviour, a single instance (singleton) or a single instance within the same request (request).

This applies to instances returned from an explicit `container.get(/* */)` call as well as instances created internally by the container to satisfy the dependencies of another service.

```ts
const builder = new ContainerBuilder()
// ...
builder.registerAndUse(Whatever).asTransient() // Default
// or
builder.registerAndUse(Whatever).asInstancePerRequest()
// or
builder.registerAndUse(Whatever).asSingleton()
// ...
const container = builder.build()
```

The scope can be configured for factories and classes, manually created instances
(those registered with the `useInstance` method) will be always registered as singletons.
