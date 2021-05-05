import 'reflect-metadata'
import t from 'tap'
import { Container } from '../src/diod'
import { Clock } from './fixtures/clock'
import { ConsoleLogger } from './fixtures/console-logger'

t.test('returns registered parameter-less constructor class instance', (t) => {
  // Arrange
  const container = new Container()
  container.register(Clock)

  // Act
  const clock = container.get(Clock)

  // Assert
  t.equal(clock.constructor.name, 'Clock')
  t.not(clock.now(), '')
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
  }, new Error('Service not registered for: ConsoleLogger'))
  t.end()
})
