# Class: ClassConfiguration<T\>

## Type parameters

| Name |
| :------ |
| `T` |

## Hierarchy

- *ServiceConfiguration*<T\>

  ↳ **ClassConfiguration**

## Methods

### withDependencies

▸ **withDependencies**(`dependencies`: [*Identifier*](../README.md#identifier)<unknown\>[]): [*ClassConfiguration*](classconfiguration.md)<T\>

Declare class dependencies manually

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `dependencies` | [*Identifier*](../README.md#identifier)<unknown\>[] | List of class dependency identifiers to inject in order to the constructor. |

**Returns:** [*ClassConfiguration*](classconfiguration.md)<T\>
