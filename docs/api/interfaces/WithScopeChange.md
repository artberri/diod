# Interface: WithScopeChange

## Methods

### asInstancePerRequest

▸ **asInstancePerRequest**(): [`WithScopeChange`](WithScopeChange.md)

Configure the service so that the same shared instance is used during
within a [Container](Container.md).get request.

#### Returns

[`WithScopeChange`](WithScopeChange.md)

___

### asSingleton

▸ **asSingleton**(): [`WithScopeChange`](WithScopeChange.md)

Configure the service so that always gets the same, shared instance.

#### Returns

[`WithScopeChange`](WithScopeChange.md)

___

### asTransient

▸ **asTransient**(): [`WithScopeChange`](WithScopeChange.md)

Configure the service so that always gets a new instance.

#### Returns

[`WithScopeChange`](WithScopeChange.md)
