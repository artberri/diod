# Class: ContainerBuilder

Used to build an [Container](../interfaces/Container.md) from service registrations.

## Constructors

### constructor

• **new ContainerBuilder**(): [`ContainerBuilder`](ContainerBuilder.md)

#### Returns

[`ContainerBuilder`](ContainerBuilder.md)

## Methods

### build

▸ **build**(`options?`): [`Container`](../interfaces/Container.md)

Builds an inmutable [Container](../interfaces/Container.md).

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | [`BuildOptions`](../README.md#buildoptions) | Build options. |

#### Returns

[`Container`](../interfaces/Container.md)

___

### isRegistered

▸ **isRegistered**\<`T`\>(`identifier`): `boolean`

Checks whether a service is registered or not.

#### Type parameters

| Name | Description |
| :------ | :------ |
| `T` | The type of the service. |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `identifier` | [`Identifier`](../README.md#identifier)\<`T`\> | The class that identifies this service to be checked. |

#### Returns

`boolean`

___

### register

▸ **register**\<`T`\>(`identifier`): [`Registration`](../interfaces/Registration.md)\<`T`\>

Registers a service.

#### Type parameters

| Name | Description |
| :------ | :------ |
| `T` | The type of the service. |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `identifier` | [`Identifier`](../README.md#identifier)\<`T`\> | The class that identifies this service. This class identifier must be used to get the service from the container or when defining it as a dependency. |

#### Returns

[`Registration`](../interfaces/Registration.md)\<`T`\>

___

### registerAndUse

▸ **registerAndUse**\<`T`\>(`newable`): [`ConfigurableRegistration`](../interfaces/ConfigurableRegistration.md) & [`WithScopeChange`](../interfaces/WithScopeChange.md) & [`WithDependencies`](../interfaces/WithDependencies.md)

Alias for `.register(newable).use(newable)`.

#### Type parameters

| Name | Description |
| :------ | :------ |
| `T` | The type of the service. |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `newable` | [`Newable`](../interfaces/Newable.md)\<`T`\> | The concrete class implementation to be registered as itself. |

#### Returns

[`ConfigurableRegistration`](../interfaces/ConfigurableRegistration.md) & [`WithScopeChange`](../interfaces/WithScopeChange.md) & [`WithDependencies`](../interfaces/WithDependencies.md)

___

### unregister

▸ **unregister**\<`T`\>(`identifier`): `void`

Unregister previously registered service.

#### Type parameters

| Name | Description |
| :------ | :------ |
| `T` | The type of the service. |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `identifier` | [`Identifier`](../README.md#identifier)\<`T`\> | The class that identifies this service to be unregistered. |

#### Returns

`void`
