import 'reflect-metadata'
import t from 'tap'
import { Container } from '../src/diod'
import { ConsoleLogger } from './fixtures/console-logger'
import { NotPerson } from './fixtures/not-person'
import { Person } from './fixtures/person'

t.test(
  'the constructor of the extended class is injected if target has not constructor',
  (t) => {
    // Arrange
    const container = new Container()
    container.register(Person)
    container.register(ConsoleLogger)

    // Act
    const person = container.get(Person)

    // Assert
    t.equal(person.constructor.name, 'Person')
    t.doesNotThrow(() => person.say())
    t.end()
  }
)

t.test(
  'throws error when service without contructor extends not decorated service with constructor dependencies',
  (t) => {
    // Arrange
    const container = new Container()

    // Assert
    t.throws(() => {
      // Act
      container.register(NotPerson)
    }, new Error('Service not decorated: NotDecorated'))
    t.end()
  }
)
