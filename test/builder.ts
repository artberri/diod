import 'reflect-metadata'
import tap from 'tap'
import { ContainerBuilder } from '../src/diod'
import { Agenda } from './fixtures/agenda'
import { Circular1, Circular2, Circular3 } from './fixtures/circular'
import { NotDecorated } from './fixtures/not-decorated'
import { NotPerson } from './fixtures/not-person'
import { BankUser } from './fixtures/user'

tap.test('throws error when there is not completed registration', (t) => {
  // Arrange
  const builder = new ContainerBuilder()
  builder.register(NotDecorated)

  // Assert
  t.throws(() => {
    // Act
    builder.build()
  }, new Error('Service NotDecorated registration is not completed. Use .asSelf() or .as(SomeAbstraction) to finish its registration'))
  t.end()
})

tap.test(
  'throws error when asked for a not decorated service with constructor dependencies',
  (t) => {
    // Arrange
    const builder = new ContainerBuilder()
    builder.register(NotDecorated).asSelf()

    // Assert
    t.throws(() => {
      // Act
      builder.build()
    }, new Error('Service not decorated: NotDecorated'))
    t.end()
  }
)

tap.test(
  'throws error building a container with a registered service which has unregistered dependencies',
  (t) => {
    // Arrange
    const builder = new ContainerBuilder()
    builder.register(Agenda).asSelf()

    // Assert
    t.throws(() => {
      // Act
      builder.build()
    }, new Error('Service not registered for the following dependencies of Agenda: Clock, Calendar'))
    t.end()
  }
)

tap.test(
  'throws error when service without contructor extends not decorated service with constructor dependencies',
  (t) => {
    // Arrange
    const builder = new ContainerBuilder()
    builder.register(NotPerson).asSelf()

    // Assert
    t.throws(() => {
      // Act
      builder.build()
    }, new Error('Service not decorated: NotPerson -> NotDecorated'))
    t.end()
  }
)

tap.test(
  'throws error when needed dependencies are not provided for non autowired service',
  (t) => {
    // Arrange
    const builder = new ContainerBuilder()
    builder.register(BankUser).asSelf()

    // Assert
    t.throws(() => {
      // Act
      builder.build({ autowire: false })
    }, new Error('Dependencies must be provided for non autowired services. Service with missing dependencies: BankUser'))
    t.end()
  }
)

tap.test('throws error if circular dependencies are detected', (t) => {
  // Arrange
  const builder = new ContainerBuilder()
  builder.register(Circular1).withDependencies([Circular2]).asSelf()
  builder.register(Circular2).withDependencies([Circular3]).asSelf()
  builder.register(Circular3).withDependencies([Circular1]).asSelf()

  // Assert
  t.throws(() => {
    // Act
    builder.build({ autowire: false })
  }, new Error('Circular dependency detected: Circular1 -> Circular2 -> Circular3 -> Circular1'))
  t.end()
})
