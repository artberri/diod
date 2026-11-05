import 'reflect-metadata'
import { expect, test } from 'vitest'
import { ContainerBuilder } from '../src/diod'
import { Agenda } from './fixtures/agenda'
import { Calendar } from './fixtures/calendar'
import { Clock } from './fixtures/clock'

test('returns registered instance with basic dependencies', () => {
	// Arrange
	const builder = new ContainerBuilder()
	builder.register(Clock).use(Clock)
	builder.registerAndUse(Calendar)
	builder.register(Agenda).useClass(Agenda)
	const container = builder.build()

	// Act
	const agenda = container.get(Agenda)

	// Assert
	expect(agenda.constructor.name).toBe('Agenda')
	expect(agenda.now()).not.toBe('')
})
