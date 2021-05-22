# DIoD - v1.0.0-alpha.2

## Classes

- [ClassConfiguration](classes/classconfiguration.md)
- [Container](classes/container.md)
- [ContainerBuilder](classes/containerbuilder.md)
- [FactoryConfiguration](classes/factoryconfiguration.md)
- [Registration](classes/registration.md)

## Interfaces

- [Abstract](interfaces/abstract.md)
- [Newable](interfaces/newable.md)

## Type aliases

### BuildOptions

Ƭ **BuildOptions**: *object*

Options for the [Container](classes/container.md) build method.

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `autowire?` | *boolean* | Whether to autowire dependencies based on types or not. Default value: `true`. |

___

### Factory

Ƭ **Factory**<T\>: (`container`: [*Container*](classes/container.md)) => T

Represents a factory to create instances of a class.
The [Container](classes/container.md) will be passed to the registered factory to be able to
get any other service.

#### Type parameters

| Name | Description |
| :------ | :------ |
| `T` | Class type. |

#### Type declaration

▸ (`container`: [*Container*](classes/container.md)): T

#### Parameters

| Name | Type |
| :------ | :------ |
| `container` | [*Container*](classes/container.md) |

**Returns:** T

___

### Identifier

Ƭ **Identifier**<T\>: [*Newable*](interfaces/newable.md)<T\> \| [*Abstract*](interfaces/abstract.md)<T\>

Service identifier. Can be a concrete implementation or an abstraction.

#### Type parameters

| Name | Description |
| :------ | :------ |
| `T` | Class type. |

## Functions

### Service

▸ `Const` **Service**(): ClassDecorator

Decorator for injectable classes. Every registered service must
be decorated because without decorators Typescript won't emit
constructor metadata.

**Returns:** ClassDecorator
