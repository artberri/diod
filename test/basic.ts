import 'reflect-metadata'
import { expect, test } from 'vitest'
import { ContainerBuilder } from '../src/diod'
import { Clock } from './fixtures/clock'
import { ConsoleLogger } from './fixtures/console-logger'

test('returns registered parameter-less constructor class instance', () => {
	// Arrange
	const builder = new ContainerBuilder()
	builder.registerAndUse(Clock)
	const container = builder.build()

	// Act
	const clock = container.get(Clock)

	// Assert
	expect(clock.constructor.name).toBe('Clock')
	expect(clock.now()).not.toBe('')
})

test('throws error when asked for an unregistered service', () => {
	// Arrange
	const builder = new ContainerBuilder()
	builder.registerAndUse(Clock)
	const container = builder.build()

	// Assert
	expect(() => {
		// Act
		container.get(ConsoleLogger)
	}).toThrow(new Error('Service not registered for: ConsoleLogger'))
})
