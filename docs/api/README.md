# DIoD - v1.0.0-rc

## Classes

- [Container](classes/container.md)
- [ContainerBuilder](classes/containerbuilder.md)
- [Registration](classes/registration.md)

## Interfaces

- [Abstract](interfaces/abstract.md)
- [Newable](interfaces/newable.md)

## Type aliases

### BuildOptions

Ƭ **BuildOptions**: _object_

Options for the [Container](classes/container.md) build method.

#### Type declaration

| Name        | Type      | Description                                                                    |
| :---------- | :-------- | :----------------------------------------------------------------------------- |
| `autowire?` | _boolean_ | Whether to autowire dependencies based on types or not. Default value: `true`. |

---

### Identifier

Ƭ **Identifier**<T\>: [_Newable_](interfaces/newable.md)<T\> \| [_Abstract_](interfaces/abstract.md)<T\>

Service identifier. Can be a concrete implementation or an abstraction.

#### Type parameters

| Name | Description |
| :--- | :---------- |
| `T`  | Class type. |

## Functions

### Service

▸ `Const` **Service**(): ClassDecorator

Decorator for injectable classes. Every registered service must
decorated because without decorators Typescript won't emit
constructor metadata.

**Returns:** ClassDecorator
