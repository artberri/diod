[**DIOD v3.0.0**](../README.md) • **Docs**

***

# Interface: ConfigurableRegistration

Configuration that allows scope change

## Methods

### addTag()

> **addTag**(`tag`): `this`

Tag the service (the tag will be added to previously added tags if there are).

#### Parameters

• **tag**: `string`

#### Returns

`this`

***

### private()

> **private**(): `this`

The service can only be used as a dependency and it can't be queried from the container.

#### Returns

`this`

***

### public()

> **public**(): `this`

The service can be used as a dependency and it can be queried from the container.

#### Returns

`this`
