import 'reflect-metadata'
import { expect, test } from 'vitest'
import { ContainerBuilder } from '../src/diod'
import {
	BankUser,
	SessionManager,
	ShopUser,
	ShoppingCart,
} from './fixtures/user'

test('the constructor of the extended class is injected if target has not constructor', () => {
	// Arrange
	const builder = new ContainerBuilder()
	builder.registerAndUse(BankUser).withDependencies([SessionManager])
	builder
		.registerAndUse(ShopUser)
		.withDependencies([SessionManager, ShoppingCart])
	builder.registerAndUse(SessionManager).withDependencies([])
	builder.registerAndUse(ShoppingCart)
	const container = builder.build()

	// Act
	const bankUser = container.get(BankUser)
	const shopUser = container.get(ShopUser)

	// Assert
	expect(bankUser.constructor.name).toBe('BankUser')
	expect(shopUser.constructor.name).toBe('ShopUser')
	expect(() => bankUser.login()).not.toThrow()
	expect(() => shopUser.add()).not.toThrow()
})
