[**DIOD v3.0.0**](../README.md) • **Docs**

***

# Class: ContainerBuilder

Used to build an [Container](../interfaces/Container.md) from service registrations.

## Constructors

### new ContainerBuilder()

> **new ContainerBuilder**(): [`ContainerBuilder`](ContainerBuilder.md)

#### Returns

[`ContainerBuilder`](ContainerBuilder.md)

## Methods

### build()

> **build**(`options`): [`Container`](../interfaces/Container.md)

Builds an immutable [Container](../interfaces/Container.md).

#### Parameters

• **options**: [`BuildOptions`](../type-aliases/BuildOptions.md) = `{}`

Build options.

#### Returns

[`Container`](../interfaces/Container.md)

***

### isRegistered()

> **isRegistered**\<`T`\>(`identifier`): `boolean`

Checks whether a service is registered or not.

#### Type Parameters

• **T**

The type of the service.

#### Parameters

• **identifier**: [`Identifier`](../type-aliases/Identifier.md)\<`T`\>

The class that identifies this service to be checked.

#### Returns

`boolean`

***

### register()

> **register**\<`T`\>(`identifier`): [`Registration`](../interfaces/Registration.md)\<`T`\>

Registers a service.

#### Type Parameters

• **T**

The type of the service.

#### Parameters

• **identifier**: [`Identifier`](../type-aliases/Identifier.md)\<`T`\>

The class that identifies this service. This class
identifier must be used to get the service from the container or when
defining it as a dependency.

#### Returns

[`Registration`](../interfaces/Registration.md)\<`T`\>

***

### registerAndUse()

> **registerAndUse**\<`T`\>(`newable`): [`ConfigurableRegistration`](../interfaces/ConfigurableRegistration.md) & [`WithScopeChange`](../interfaces/WithScopeChange.md) & [`WithDependencies`](../interfaces/WithDependencies.md)

Alias for `.register(newable).use(newable)`.

#### Type Parameters

• **T**

The type of the service.

#### Parameters

• **newable**: [`Newable`](../interfaces/Newable.md)\<`T`\>

The concrete class implementation to be registered as itself.

#### Returns

[`ConfigurableRegistration`](../interfaces/ConfigurableRegistration.md) & [`WithScopeChange`](../interfaces/WithScopeChange.md) & [`WithDependencies`](../interfaces/WithDependencies.md)

***

### unregister()

> **unregister**\<`T`\>(`identifier`): `void`

Unregister previously registered service.

#### Type Parameters

• **T**

The type of the service.

#### Parameters

• **identifier**: [`Identifier`](../type-aliases/Identifier.md)\<`T`\>

The class that identifies this service to be unregistered.

#### Returns

`void`
