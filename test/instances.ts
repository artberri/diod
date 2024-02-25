import 'reflect-metadata'
import tap from 'tap'
import { ContainerBuilder } from '../src/diod'
import { Agenda } from './fixtures/agenda'
import { Calendar } from './fixtures/calendar'
import { Clock } from './fixtures/clock'
import { ConsoleLogger } from './fixtures/console-logger'
import { Person } from './fixtures/person'
import { Sayer } from './fixtures/sayer'

void tap.test('returns manually created class instance', (t) => {
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
	t.equal(container.get(Sayer).rand, person.rand)
	t.equal(container.get(Clock).rand, clock.rand)
	t.equal(container.get(Agenda).clock.rand, clock.rand)
	t.end()
})
