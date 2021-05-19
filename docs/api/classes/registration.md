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

▸ **use**(`newable`: [*Newable*](../interfaces/newable.md)<T\>): *UseClass*<T\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `newable` | [*Newable*](../interfaces/newable.md)<T\> |

**Returns:** *UseClass*<T\>

___

### useClass

▸ **useClass**(`newable`: [*Newable*](../interfaces/newable.md)<T\>): *UseClass*<T\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `newable` | [*Newable*](../interfaces/newable.md)<T\> |

**Returns:** *UseClass*<T\>

___

### useFactory

▸ **useFactory**(`factory`: *Factory*<T\>): *UseFactory*<T\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `factory` | *Factory*<T\> |

**Returns:** *UseFactory*<T\>

___

### useInstance

▸ **useInstance**(`instance`: T): *UseInstance*<T\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `instance` | T |

**Returns:** *UseInstance*<T\>

___

### createBuildable

▸ `Static` **createBuildable**<TIdentifier\>(`identifier`: [*Identifier*](../README.md#identifier)<TIdentifier\>): *Buildable*<[*Registration*](registration.md)<TIdentifier\>, TIdentifier\>

#### Type parameters

| Name |
| :------ |
| `TIdentifier` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `identifier` | [*Identifier*](../README.md#identifier)<TIdentifier\> |

**Returns:** *Buildable*<[*Registration*](registration.md)<TIdentifier\>, TIdentifier\>
