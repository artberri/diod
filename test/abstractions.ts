import 'reflect-metadata'
import tap from 'tap'
import { ContainerBuilder } from '../src/diod'
import { ConsoleLogger } from './fixtures/console-logger'
import { NotPerson } from './fixtures/not-person'
import { Person } from './fixtures/person'

tap.test(
  'the constructor of the extended class is injected if target has not constructor',
  (t) => {
    // Arrange
    const builder = new ContainerBuilder()
    builder.register(Person)
    builder.register(ConsoleLogger)
    const container = builder.build()

    // Act
    const person = container.get(Person)

    // Assert
    t.equal(person.constructor.name, 'Person')
    t.doesNotThrow(() => person.say())
    t.end()
  }
)

tap.test(
  'throws error when service without contructor extends not decorated service with constructor dependencies',
  (t) => {
    // Arrange
    const builder = new ContainerBuilder()

    // Assert
    t.throws(() => {
      // Act
      builder.register(NotPerson)
    }, new Error('Service not decorated: NotDecorated'))
    t.end()
  }
)
