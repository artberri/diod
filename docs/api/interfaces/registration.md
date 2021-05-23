# Interface: Registration<T\>

## Type parameters

| Name |
| :------ |
| `T` |

## Methods

### use

▸ **use**(`newable`: [*Newable*](newable.md)<T\>): [*ConfigurableRegistration*](configurableregistration.md) & [*WithScopeChange*](withscopechange.md) & [*WithDependencies*](withdependencies.md)

Configure the class implementation that the identifier will provide.
Alias of `useClass`.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `newable` | [*Newable*](newable.md)<T\> | The implementation that the identifier will provide. |

**Returns:** [*ConfigurableRegistration*](configurableregistration.md) & [*WithScopeChange*](withscopechange.md) & [*WithDependencies*](withdependencies.md)

Configuration fluent API for classes

___

### useClass

▸ **useClass**(`newable`: [*Newable*](newable.md)<T\>): [*ConfigurableRegistration*](configurableregistration.md) & [*WithScopeChange*](withscopechange.md) & [*WithDependencies*](withdependencies.md)

Configure the class implementation that the identifier will provide.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `newable` | [*Newable*](newable.md)<T\> | The implementation that the identifier will provide. |

**Returns:** [*ConfigurableRegistration*](configurableregistration.md) & [*WithScopeChange*](withscopechange.md) & [*WithDependencies*](withdependencies.md)

___

### useFactory

▸ **useFactory**(`factory`: [*Factory*](../README.md#factory)<T\>): [*WithScopeChange*](withscopechange.md)

Configure a factory that returns the instance that the identifier will provide.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `factory` | [*Factory*](../README.md#factory)<T\> | The factory that will be executed when the identifier is requested. |

**Returns:** [*WithScopeChange*](withscopechange.md)

Configuration fluent API for factories

___

### useInstance

▸ **useInstance**(`instance`: T): [*ConfigurableRegistration*](configurableregistration.md)

Configure the instance that the identifier will provide.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `instance` | T | The instance that the identifier will provide. |

**Returns:** [*ConfigurableRegistration*](configurableregistration.md)
