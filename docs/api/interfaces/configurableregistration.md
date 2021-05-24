# Interface: ConfigurableRegistration

Configuration that allows scope change

## Methods

### addTag

▸ **addTag**(`tag`: *string*): [*ConfigurableRegistration*](configurableregistration.md)

Tag the service (the tag will be added to previously added tags if there are).

#### Parameters

| Name | Type |
| :------ | :------ |
| `tag` | *string* |

**Returns:** [*ConfigurableRegistration*](configurableregistration.md)

___

### private

▸ **private**(): [*ConfigurableRegistration*](configurableregistration.md)

The service can only be used as a dependency and it can't be queried from the container.

**Returns:** [*ConfigurableRegistration*](configurableregistration.md)

___

### public

▸ **public**(): [*ConfigurableRegistration*](configurableregistration.md)

The service can be used as a dependency and it can be queried from the container.

**Returns:** [*ConfigurableRegistration*](configurableregistration.md)
