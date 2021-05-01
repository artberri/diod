import t from 'tap'
import { Container } from '../src/diod'
import { Clock } from './fixtures/clock'
import { ConsoleLogger } from './fixtures/console-logger'

t.test('returns registered parameter-less constructor class instance', (t) => {
  const container = new Container()
  container.register(Clock)

  // Act
  const clock = container.get(Clock)

  // Assert
  t.equal(clock.constructor.name, 'Clock')
  t.end()
})

t.test('throws error when asked for an unregistered service', (t) => {
  // Arrange
  const container = new Container()
  container.register(Clock)

  // Assert
  t.throws(() => {
    // Act
    container.get(ConsoleLogger)
  }, new Error('Class not registered for: ConsoleLogger'))
  t.end()
})
