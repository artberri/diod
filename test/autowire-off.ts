import 'reflect-metadata'
import tap from 'tap'
import { ContainerBuilder } from '../src/diod'
import {
  BankUser,
  SessionManager,
  ShoppingCart,
  ShopUser,
} from './fixtures/user'

tap.test(
  'the constructor of the extended class is injected if target has not constructor',
  (t) => {
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
    t.equal(bankUser.constructor.name, 'BankUser')
    t.equal(shopUser.constructor.name, 'ShopUser')
    t.doesNotThrow(() => bankUser.login())
    t.doesNotThrow(() => shopUser.add())
    t.end()
  }
)
