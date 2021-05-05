import 'reflect-metadata'
import t from 'tap'
import { Container } from '../src/diod'
import { Agenda } from './fixtures/agenda'
import { Calendar } from './fixtures/calendar'
import { Clock } from './fixtures/clock'

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
