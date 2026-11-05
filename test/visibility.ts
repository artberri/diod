import 'reflect-metadata'
import { expect, test } from 'vitest'
import { ContainerBuilder } from '../src/diod'
import { Agenda } from './fixtures/agenda'
import { Calendar } from './fixtures/calendar'
import { Clock } from './fixtures/clock'

test('only public services can be directly queried from the container', () => {
	// Arrange
	const builder = new ContainerBuilder()

	// Act
	builder.registerAndUse(Agenda).public()
	builder.registerAndUse(Clock).public()
	builder.registerAndUse(Calendar).private()
	const container = builder.build()

	// Assert
	const agenda = container.get(Agenda)
	expect(agenda.clock.constructor.name).toBe('Clock')
	expect(agenda.calendar.constructor.name).toBe('Calendar')
	const clock = container.get(Clock)
	expect(clock.constructor.name).toBe('Clock')
	expect(() => {
		// Act
		container.get(Calendar)
	}).toThrow(
		new Error(
			'The Calendar service has been registered as private and can not be directly get from the container',
		),
	)
})
