# Class: FactoryConfiguration<T\>

## Type parameters

| Name |
| :------ |
| `T` |

## Hierarchy

- *ServiceConfiguration*<T\>

  ↳ **FactoryConfiguration**

## Implements

- *WithScopeChange*<[*FactoryConfiguration*](factoryconfiguration.md)<T\>\>

## Methods

### asInstancePerRequest

▸ **asInstancePerRequest**(): [*FactoryConfiguration*](factoryconfiguration.md)<T\>

Configure the service so that the same shared instance is used during
within a [Container](container.md).get request.

**Returns:** [*FactoryConfiguration*](factoryconfiguration.md)<T\>

Implementation of: WithScopeChange.asInstancePerRequest

Overrides: ServiceConfiguration.asInstancePerRequest

___

### asSingleton

▸ **asSingleton**(): [*FactoryConfiguration*](factoryconfiguration.md)<T\>

Configure the service so that always gets the same, shared instance.

**Returns:** [*FactoryConfiguration*](factoryconfiguration.md)<T\>

Implementation of: WithScopeChange.asSingleton

Overrides: ServiceConfiguration.asSingleton

___

### asTransient

▸ **asTransient**(): [*FactoryConfiguration*](factoryconfiguration.md)<T\>

Configure the service so that always gets a new instance.

**Returns:** [*FactoryConfiguration*](factoryconfiguration.md)<T\>

Implementation of: WithScopeChange.asTransient

Overrides: ServiceConfiguration.asTransient
