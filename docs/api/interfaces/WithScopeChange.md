[**DIOD v3.0.0**](../README.md) • **Docs**

***

# Interface: WithScopeChange

## Methods

### asInstancePerRequest()

> **asInstancePerRequest**(): `this`

Configure the service so that the same shared instance is used during
within a [Container](Container.md).get request.

#### Returns

`this`

***

### asSingleton()

> **asSingleton**(): `this`

Configure the service so that always gets the same, shared instance.

#### Returns

`this`

***

### asTransient()

> **asTransient**(): `this`

Configure the service so that always gets a new instance.

#### Returns

`this`
