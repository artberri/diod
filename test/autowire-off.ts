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
    builder.register(BankUser).as(BankUser).withDependencies([SessionManager])
    builder
      .register(ShopUser)
      .withDependencies([SessionManager, ShoppingCart])
      .asSelf()
    builder.register(SessionManager).asSelf().withDependencies([])
    builder.register(ShoppingCart).asSelf()
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
