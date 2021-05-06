import 'reflect-metadata'
import t from 'tap'
import { Container } from '../src/diod'
import { Agenda } from './fixtures/agenda'
import { Calendar } from './fixtures/calendar'
import { Clock } from './fixtures/clock'
import { NotDecorated } from './fixtures/not-decorated'

t.test('returns registered instance with basic dependencies', (t) => {
  // Arrange
  const container = new Container()
  container.register(Clock)
  container.register(Calendar)
  container.register(Agenda)

  // Act
  const agenda = container.get(Agenda)

  // Assert
  t.equal(agenda.constructor.name, 'Agenda')
  t.not(agenda.now(), '')
  t.end()
})

t.test(
  'throws error when asked for a registered service with unregistered dependencies',
  (t) => {
    // Arrange
    const container = new Container()
    container.register(Agenda)

    // Assert
    t.throws(() => {
      // Act
      container.get(Agenda)
    }, new Error('Service not registered for the following dependencies of Agenda: Clock, Calendar'))
    t.end()
  }
)

t.test(
  'throws error when asked for a not decorated service with constructor dependencies',
  (t) => {
    // Arrange
    const container = new Container()

    // Assert
    t.throws(() => {
      // Act
      container.register(NotDecorated)
    }, new Error('Service not decorated: NotDecorated'))
    t.end()
  }
)
