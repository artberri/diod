# Tagging services

You can tag services. It could be useful when you want to get a group of services
that are meant to be used for a specific purpose.

For example, imagine that you have multiple event handlers like these:

```ts
const builder = new ContainerBuilder()
// ...
builder.register(EventBus).use(MyEventBus).asSingleton()
builder.registerAndUse(WhateverEventHandler).addTag('event-handler')
builder.registerAndUse(FooEventHandler).addTag('event-handler')
builder.registerAndUse(BarEventHandler).addTag('event-handler')
builder.registerAndUse(Whatever).asInstancePerRequest()
// ...
const container = builder.build()
```

And you want to register all of them in your event bus:

```ts
const handlers = container
  .findTaggedServiceIdentifiers<EventHandler>('event-handler')
  .map((identifier) => container.get(identifier))
const eventBus = container.get(EventBus)
eventBus.addHandlers(handlers)
```

This is just an example, you can use tags for whatever you want.
