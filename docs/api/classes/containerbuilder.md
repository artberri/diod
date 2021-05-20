# Class: ContainerBuilder

Used to build an [Container](container.md) from service registrations.

## Constructors

### constructor

\+ **new ContainerBuilder**(): [*ContainerBuilder*](containerbuilder.md)

**Returns:** [*ContainerBuilder*](containerbuilder.md)

## Methods

### build

▸ **build**(`__namedParameters?`: [*BuildOptions*](../README.md#buildoptions)): [*Container*](container.md)

Builds an inmutable [Container](container.md).

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `__namedParameters` | [*BuildOptions*](../README.md#buildoptions) | {} |

**Returns:** [*Container*](container.md)

___

### isRegistered

▸ **isRegistered**<T\>(`identifier`: [*Identifier*](../README.md#identifier)<T\>): *boolean*

Checks whether a service is registered or not.

#### Type parameters

| Name | Description |
| :------ | :------ |
| `T` | The type of the service. |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `identifier` | [*Identifier*](../README.md#identifier)<T\> | The class that identifies this service to be checked. |

**Returns:** *boolean*

___

### register

▸ **register**<T\>(`identifier`: [*Identifier*](../README.md#identifier)<T\>): [*Registration*](registration.md)<T\>

Registers a service.

#### Type parameters

| Name | Description |
| :------ | :------ |
| `T` | The type of the service. |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `identifier` | [*Identifier*](../README.md#identifier)<T\> | The class that identifies this service. This class identifier must be used to get the service from the container or when defining it as a dependency. |

**Returns:** [*Registration*](registration.md)<T\>

___

### registerAndUse

▸ **registerAndUse**<T\>(`newable`: [*Newable*](../interfaces/newable.md)<T\>): [*ClassConfiguration*](classconfiguration.md)<T\>

Alias for `.register(newable).use(newable)`.

#### Type parameters

| Name | Description |
| :------ | :------ |
| `T` | The type of the service. |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `newable` | [*Newable*](../interfaces/newable.md)<T\> | The concrete class implementation to be registered as itself. |

**Returns:** [*ClassConfiguration*](classconfiguration.md)<T\>

___

### unregister

▸ **unregister**<T\>(`identifier`: [*Identifier*](../README.md#identifier)<T\>): *void*

Unregister previously registered service.

#### Type parameters

| Name | Description |
| :------ | :------ |
| `T` | The type of the service. |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `identifier` | [*Identifier*](../README.md#identifier)<T\> | The class that identifies this service to be unregistered. |

**Returns:** *void*
