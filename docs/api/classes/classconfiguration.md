# Class: ClassConfiguration<T\>

## Type parameters

| Name |
| :------ |
| `T` |

## Hierarchy

- *ServiceConfiguration*<T\>

  ↳ **ClassConfiguration**

## Implements

- *WithScopeChange*<[*ClassConfiguration*](classconfiguration.md)<T\>\>

## Methods

### asInstancePerRequest

▸ **asInstancePerRequest**(): [*ClassConfiguration*](classconfiguration.md)<T\>

Configure the service so that the same shared instance is used during
within a [Container](container.md).get request.

**Returns:** [*ClassConfiguration*](classconfiguration.md)<T\>

Implementation of: WithScopeChange.asInstancePerRequest

Overrides: ServiceConfiguration.asInstancePerRequest

___

### asSingleton

▸ **asSingleton**(): [*ClassConfiguration*](classconfiguration.md)<T\>

Configure the service so that always gets the same, shared instance.

**Returns:** [*ClassConfiguration*](classconfiguration.md)<T\>

Implementation of: WithScopeChange.asSingleton

Overrides: ServiceConfiguration.asSingleton

___

### asTransient

▸ **asTransient**(): [*ClassConfiguration*](classconfiguration.md)<T\>

Configure the service so that always gets a new instance.

**Returns:** [*ClassConfiguration*](classconfiguration.md)<T\>

Implementation of: WithScopeChange.asTransient

Overrides: ServiceConfiguration.asTransient

___

### withDependencies

▸ **withDependencies**(`dependencies`: [*Identifier*](../README.md#identifier)<unknown\>[]): [*ClassConfiguration*](classconfiguration.md)<T\>

Declare class dependencies manually

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `dependencies` | [*Identifier*](../README.md#identifier)<unknown\>[] | List of class dependency identifiers to inject in order to the constructor. |

**Returns:** [*ClassConfiguration*](classconfiguration.md)<T\>
