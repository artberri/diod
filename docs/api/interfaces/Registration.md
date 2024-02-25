# Interface: Registration\<T\>

## Type parameters

| Name |
| :------ |
| `T` |

## Methods

### use

▸ **use**(`newable`): [`ConfigurableRegistration`](ConfigurableRegistration.md) & [`WithScopeChange`](WithScopeChange.md) & [`WithDependencies`](WithDependencies.md)

Configure the class implementation that the identifier will provide.
Alias of `useClass`.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `newable` | [`Newable`](Newable.md)\<`T`\> | The implementation that the identifier will provide. |

#### Returns

[`ConfigurableRegistration`](ConfigurableRegistration.md) & [`WithScopeChange`](WithScopeChange.md) & [`WithDependencies`](WithDependencies.md)

Configuration fluent API for classes

___

### useClass

▸ **useClass**(`newable`): [`ConfigurableRegistration`](ConfigurableRegistration.md) & [`WithScopeChange`](WithScopeChange.md) & [`WithDependencies`](WithDependencies.md)

Configure the class implementation that the identifier will provide.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `newable` | [`Newable`](Newable.md)\<`T`\> | The implementation that the identifier will provide. |

#### Returns

[`ConfigurableRegistration`](ConfigurableRegistration.md) & [`WithScopeChange`](WithScopeChange.md) & [`WithDependencies`](WithDependencies.md)

Configuration fluent API for classes

___

### useFactory

▸ **useFactory**(`factory`): [`ConfigurableRegistration`](ConfigurableRegistration.md) & [`WithScopeChange`](WithScopeChange.md)

Configure a factory that returns the instance that the identifier will provide.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `factory` | [`Factory`](../README.md#factory)\<`T`\> | The factory that will be executed when the identifier is requested. |

#### Returns

[`ConfigurableRegistration`](ConfigurableRegistration.md) & [`WithScopeChange`](WithScopeChange.md)

Configuration fluent API for factories

___

### useInstance

▸ **useInstance**(`instance`): [`ConfigurableRegistration`](ConfigurableRegistration.md)

Configure the instance that the identifier will provide.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `instance` | [`Instance`](../README.md#instance)\<`T`\> | The instance that the identifier will provide. |

#### Returns

[`ConfigurableRegistration`](ConfigurableRegistration.md)

Configuration fluent API for instances
