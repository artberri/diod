import 'reflect-metadata'
import { expect, test } from 'vitest'
import { ContainerBuilder } from '../src/diod'
import { Agenda } from './fixtures/agenda'
import { Calendar } from './fixtures/calendar'
import { Clock } from './fixtures/clock'

test('returns instances created with factories', () => {
	// Arrange
	const builder = new ContainerBuilder()
	builder.registerAndUse(Calendar)

	// Act
	builder.register(Clock).useFactory(() => new Clock())
	builder
		.register(Agenda)
		.useFactory((c) => new Agenda(c.get(Clock), c.get(Calendar)))
	const container = builder.build()

	// Assert
	expect(container.get(Agenda).constructor.name).toBe('Agenda')
})
