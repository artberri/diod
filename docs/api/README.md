# DIOD - v1.0.1

## Classes

- [ContainerBuilder](classes/ContainerBuilder.md)

## Interfaces

- [Abstract](interfaces/Abstract.md)
- [ConfigurableRegistration](interfaces/ConfigurableRegistration.md)
- [Container](interfaces/Container.md)
- [Newable](interfaces/Newable.md)
- [Registration](interfaces/Registration.md)
- [WithDependencies](interfaces/WithDependencies.md)
- [WithScopeChange](interfaces/WithScopeChange.md)

## Type aliases

### BuildOptions

Ƭ **BuildOptions**: `Object`

Options for the [Container](interfaces/Container.md) build method.

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `autowire?` | `boolean` | Whether to autowire dependencies based on types or not. Default value: `true`. |

___

### Factory

Ƭ **Factory**<`T`\>: (`container`: [`Container`](interfaces/Container.md)) => `T`

#### Type parameters

| Name | Description |
| :------ | :------ |
| `T` | Class type. |

#### Type declaration

▸ (`container`): `T`

Represents a factory to create instances of a class.
The [Container](interfaces/Container.md) will be passed to the registered factory to be able to
get any other service.

##### Parameters

| Name | Type |
| :------ | :------ |
| `container` | [`Container`](interfaces/Container.md) |

##### Returns

`T`

___

### Identifier

Ƭ **Identifier**<`T`\>: [`Newable`](interfaces/Newable.md)<`T`\> \| [`Abstract`](interfaces/Abstract.md)<`T`\>

Service identifier. Can be a concrete implementation or an abstraction.

#### Type parameters

| Name | Description |
| :------ | :------ |
| `T` | Class type. |

## Functions

### Service

▸ `Const` **Service**(): `ClassDecorator`

Decorator for injectable classes. Every registered service must
be decorated because without decorators Typescript won't emit
constructor metadata.

#### Returns

`ClassDecorator`
