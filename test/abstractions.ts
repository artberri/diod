import 'reflect-metadata'
import tap from 'tap'
import { ContainerBuilder } from '../src/diod'
import { ConsoleLogger } from './fixtures/console-logger'
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
