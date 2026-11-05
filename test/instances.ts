import 'reflect-metadata'
import { expect, test } from 'vitest'
import { ContainerBuilder } from '../src/diod'
import { Agenda } from './fixtures/agenda'
import { Calendar } from './fixtures/calendar'
import { Clock } from './fixtures/clock'
import { ConsoleLogger } from './fixtures/console-logger'
import { Person } from './fixtures/person'
import { Sayer } from './fixtures/sayer'

test('returns manually created class instance', () => {
	// Arrange
	const clock = new Clock()
	const person = new Person(new ConsoleLogger())
	const builder = new ContainerBuilder()

	builder.registerAndUse(Agenda)
	builder.registerAndUse(Calendar)

	// Act
	builder.register(Clock).useInstance(clock)
	builder.register(Sayer).useInstance(person)
	const container = builder.build()

	// Assert
	expect(container.get(Sayer).rand).toBe(person.rand)
	expect(container.get(Clock).rand).toBe(clock.rand)
	expect(container.get(Agenda).clock.rand).toBe(clock.rand)
})
