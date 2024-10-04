[**DIOD v3.0.0**](../README.md) • **Docs**

***

# Interface: Container

Creates, wires dependencies and manages lifetime for a set of services.
Instances of Container are created by a [ContainerBuilder](../classes/ContainerBuilder.md).

## Methods

### findTaggedServiceIdentifiers()

> **findTaggedServiceIdentifiers**\<`T`\>(`tag`): [`Identifier`](../type-aliases/Identifier.md)\<`T`\>[]

Returns service ids for a given tag.

#### Type Parameters

• **T** = `unknown`

The type of the returned services.

#### Parameters

• **tag**: `string`

The tag name.

#### Returns

[`Identifier`](../type-aliases/Identifier.md)\<`T`\>[]

An array of service identifiers tagged with the given tag.

***

### get()

> **get**\<`T`\>(`identifier`): `T`

Gets the service object of the registered identifier.

#### Type Parameters

• **T**

The type of the service.

#### Parameters

• **identifier**: [`Identifier`](../type-aliases/Identifier.md)\<`T`\>

Class of the service to get.

#### Returns

`T`
