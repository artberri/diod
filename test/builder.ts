import 'reflect-metadata'
import tap from 'tap'
import { ContainerBuilder } from '../src/diod'
import { Agenda } from './fixtures/agenda'
import { NotDecorated } from './fixtures/not-decorated'
import { NotPerson } from './fixtures/not-person'

tap.test(
  'throws error when asked for a not decorated service with constructor dependencies',
  (t) => {
    // Arrange
    const builder = new ContainerBuilder()
    builder.register(NotDecorated)

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
    builder.register(Agenda)

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
    builder.register(NotPerson)

    // Assert
    t.throws(() => {
      // Act
      builder.build()
    }, new Error('Service not decorated: NotDecorated'))
    t.end()
  }
)
