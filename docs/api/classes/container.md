# Class: Container

Creates, wires dependencies and manages lifetime for a set of services.
Most instances of Container are created by a [ContainerBuilder](containerbuilder.md).

## Methods

### get

▸ **get**<T\>(`identifier`: [*Identifier*](../README.md#identifier)<T\>): T

Gets the service object of the registered identifier.

#### Type parameters

| Name | Description |
| :------ | :------ |
| `T` | The type of the service. |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `identifier` | [*Identifier*](../README.md#identifier)<T\> | Class of the service to get. |

**Returns:** T
