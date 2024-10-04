[**DIOD v3.0.0**](../README.md) • **Docs**

***

# Interface: Registration\<T\>

## Type Parameters

• **T**

## Methods

### use()

> **use**(`newable`): [`ConfigurableRegistration`](ConfigurableRegistration.md) & [`WithScopeChange`](WithScopeChange.md) & [`WithDependencies`](WithDependencies.md)

Configure the class implementation that the identifier will provide.
Alias of `useClass`.

#### Parameters

• **newable**: [`Newable`](Newable.md)\<`T`\>

The implementation that the identifier will provide.

#### Returns

[`ConfigurableRegistration`](ConfigurableRegistration.md) & [`WithScopeChange`](WithScopeChange.md) & [`WithDependencies`](WithDependencies.md)

Configuration fluent API for classes

***

### useClass()

> **useClass**(`newable`): [`ConfigurableRegistration`](ConfigurableRegistration.md) & [`WithScopeChange`](WithScopeChange.md) & [`WithDependencies`](WithDependencies.md)

Configure the class implementation that the identifier will provide.

#### Parameters

• **newable**: [`Newable`](Newable.md)\<`T`\>

The implementation that the identifier will provide.

#### Returns

[`ConfigurableRegistration`](ConfigurableRegistration.md) & [`WithScopeChange`](WithScopeChange.md) & [`WithDependencies`](WithDependencies.md)

Configuration fluent API for classes

***

### useFactory()

> **useFactory**(`factory`): [`ConfigurableRegistration`](ConfigurableRegistration.md) & [`WithScopeChange`](WithScopeChange.md)

Configure a factory that returns the instance that the identifier will provide.

#### Parameters

• **factory**: [`Factory`](../type-aliases/Factory.md)\<`T`\>

The factory that will be executed when the identifier is requested.

#### Returns

[`ConfigurableRegistration`](ConfigurableRegistration.md) & [`WithScopeChange`](WithScopeChange.md)

Configuration fluent API for factories

***

### useInstance()

> **useInstance**(`instance`): [`ConfigurableRegistration`](ConfigurableRegistration.md)

Configure the instance that the identifier will provide.

#### Parameters

• **instance**: [`Instance`](../type-aliases/Instance.md)\<`T`\>

The instance that the identifier will provide.

#### Returns

[`ConfigurableRegistration`](ConfigurableRegistration.md)

Configuration fluent API for instances
