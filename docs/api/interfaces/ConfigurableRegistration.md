# Interface: ConfigurableRegistration

Configuration that allows scope change

## Methods

### addTag

▸ **addTag**(`tag`): [`ConfigurableRegistration`](ConfigurableRegistration.md)

Tag the service (the tag will be added to previously added tags if there are).

#### Parameters

| Name | Type |
| :------ | :------ |
| `tag` | `string` |

#### Returns

[`ConfigurableRegistration`](ConfigurableRegistration.md)

___

### private

▸ **private**(): [`ConfigurableRegistration`](ConfigurableRegistration.md)

The service can only be used as a dependency and it can't be queried from the container.

#### Returns

[`ConfigurableRegistration`](ConfigurableRegistration.md)

___

### public

▸ **public**(): [`ConfigurableRegistration`](ConfigurableRegistration.md)

The service can be used as a dependency and it can be queried from the container.

#### Returns

[`ConfigurableRegistration`](ConfigurableRegistration.md)
