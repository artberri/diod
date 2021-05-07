import 'reflect-metadata'
import tap from 'tap'
import { ContainerBuilder } from '../src/diod'
import { Agenda } from './fixtures/agenda'
import { Calendar } from './fixtures/calendar'
import { Clock } from './fixtures/clock'
import { NotDecorated } from './fixtures/not-decorated'

tap.test('returns registered instance with basic dependencies', (t) => {
  // Arrange
  const builder = new ContainerBuilder()
  builder.register(Clock)
  builder.register(Calendar)
  builder.register(Agenda)
  const container = builder.build()

  // Act
  const agenda = container.get(Agenda)

  // Assert
  t.equal(agenda.constructor.name, 'Agenda')
  t.not(agenda.now(), '')
  t.end()
})

tap.test(
  'throws error when asked for a registered service with unregistered dependencies',
  (t) => {
    // Arrange
    const builder = new ContainerBuilder()
    builder.register(Agenda)
    const container = builder.build()

    // Assert
    t.throws(() => {
      // Act
      container.get(Agenda)
    }, new Error('Service not registered for the following dependencies of Agenda: Clock, Calendar'))
    t.end()
  }
)

tap.test(
  'throws error when asked for a not decorated service with constructor dependencies',
  (t) => {
    // Arrange
    const builder = new ContainerBuilder()

    // Assert
    t.throws(() => {
      // Act
      builder.register(NotDecorated)
    }, new Error('Service not decorated: NotDecorated'))
    t.end()
  }
)
