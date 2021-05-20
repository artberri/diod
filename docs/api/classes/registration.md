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

Configu fluent API for

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

▸ **useFactory**(`factory`: *Factory*<T\>): *void*

#### Parameters

| Name | Type |
| :------ | :------ |
| `factory` | *Factory*<T\> |

**Returns:** *void*

___

### useInstance

▸ **useInstance**(`instance`: T): *void*

#### Parameters

| Name | Type |
| :------ | :------ |
| `instance` | T |

**Returns:** *void*
