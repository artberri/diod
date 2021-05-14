import 'reflect-metadata'
import tap from 'tap'
import { ContainerBuilder } from '../src/diod'
import { Clock } from './fixtures/clock'
import { ConsoleLogger } from './fixtures/console-logger'

tap.test(
  'returns registered parameter-less constructor class instance',
  (t) => {
    // Arrange
    const builder = new ContainerBuilder()
    builder.register(Clock).asSelf()
    const container = builder.build()

    // Act
    const clock = container.get(Clock)

    // Assert
    t.equal(clock.constructor.name, 'Clock')
    t.not(clock.now(), '')
    t.end()
  }
)

tap.test('throws error when asked for an unregistered service', (t) => {
  // Arrange
  const builder = new ContainerBuilder()
  builder.register(Clock).asSelf()
  const container = builder.build()

  // Assert
  t.throws(() => {
    // Act
    container.get(ConsoleLogger)
  }, new Error('Service not registered for: ConsoleLogger'))
  t.end()
})
