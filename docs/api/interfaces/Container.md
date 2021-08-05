# Interface: Container

Creates, wires dependencies and manages lifetime for a set of services.
Instances of Container are created by a [ContainerBuilder](../classes/ContainerBuilder.md).

## Methods

### findTaggedServiceIdentifiers

▸ **findTaggedServiceIdentifiers**<`T`\>(`tag`): [`Identifier`](../README.md#identifier)<`T`\>[]

Returns service ids for a given tag.

#### Type parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `T` | `unknown` | The type of the returned services. |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `tag` | `string` | The tag name. |

#### Returns

[`Identifier`](../README.md#identifier)<`T`\>[]

An array of service identifiers tagged with the given tag.

___

### get

▸ **get**<`T`\>(`identifier`): `T`

Gets the service object of the registered identifier.

#### Type parameters

| Name | Description |
| :------ | :------ |
| `T` | The type of the service. |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `identifier` | [`Identifier`](../README.md#identifier)<`T`\> | Class of the service to get. |

#### Returns

`T`
