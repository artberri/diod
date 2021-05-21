# Class: Registration<T\>

## Type parameters

| Name |
| :------ |
| `T` |

## Properties

### identifier

• `Readonly` **identifier**: [*Identifier*](../README.md#identifier)<T\>

## Methods

### use

▸ **use**(`newable`: [*Newable*](../interfaces/newable.md)<T\>): [*ClassConfiguration*](classconfiguration.md)<T\>

Configure the class implementation that the identifier will provide.
Alias of `useClass`.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `newable` | [*Newable*](../interfaces/newable.md)<T\> | The implementation that the identifier will provide. |

**Returns:** [*ClassConfiguration*](classconfiguration.md)<T\>

Configuration fluent API for classes

___

### useClass

▸ **useClass**(`newable`: [*Newable*](../interfaces/newable.md)<T\>): [*ClassConfiguration*](classconfiguration.md)<T\>

Configure the class implementation that the identifier will provide.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `newable` | [*Newable*](../interfaces/newable.md)<T\> | The implementation that the identifier will provide. |

**Returns:** [*ClassConfiguration*](classconfiguration.md)<T\>

___

### useFactory

▸ **useFactory**(`factory`: [*Factory*](../README.md#factory)<T\>): *void*

Configure a factory that returns the instance that the identifier will provide.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `factory` | [*Factory*](../README.md#factory)<T\> | The factory that will be executed when the identifier is requested. |

**Returns:** *void*

___

### useInstance

▸ **useInstance**(`instance`: T): *void*

Configure the instance that the identifier will provide.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `instance` | T | The instance that the identifier will provide. |

**Returns:** *void*
