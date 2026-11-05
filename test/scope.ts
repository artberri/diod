import 'reflect-metadata'
import { expect, test } from 'vitest'
import { ContainerBuilder } from '../src/diod'
import { Agenda } from './fixtures/agenda'
import { Calendar } from './fixtures/calendar'
import { Clock } from './fixtures/clock'
import { MultiAgenda } from './fixtures/multi-agenda'

test('transient services will be always created as new instances', () => {
	// Arrange
	const builder = new ContainerBuilder()

	// Act
	builder.registerAndUse(Calendar).asTransient()
	builder
		.register(Clock)
		.useFactory(() => new Clock())
		.asTransient()
	builder
		.register(Agenda)
		.useFactory((c) => new Agenda(c.get(Clock), c.get(Calendar)))
		.asTransient()
	builder.registerAndUse(MultiAgenda).asTransient()
	const container = builder.build()

	// Assert
	const calendar = container.get(Calendar)
	const agenda = container.get(Agenda)
	const clock = container.get(Clock)
	const agenda2 = container.get(Agenda)
	const multiAgenda = container.get(MultiAgenda)
	expect(calendar.rand).not.toBe(agenda.calendar.rand)
	expect(clock.rand).not.toBe(agenda.clock.rand)
	expect(agenda.rand).not.toBe(agenda2.rand)
	expect(multiAgenda.agenda1.rand).not.toBe(multiAgenda.agenda2.rand)
	expect(multiAgenda.agenda1.clock.rand).not.toBe(
		multiAgenda.agenda2.clock.rand,
	)
	expect(multiAgenda.agenda1.clock.rand).not.toBe(clock.rand)
})

test('singleton services will be always the same instance', () => {
	// Arrange
	const builder = new ContainerBuilder()

	// Act
	builder.registerAndUse(Calendar).asSingleton()
	builder
		.register(Clock)
		.useFactory(() => new Clock())
		.asSingleton()
	builder
		.register(Agenda)
		.useFactory((c) => new Agenda(c.get(Clock), c.get(Calendar)))
		.asSingleton()
	builder.registerAndUse(MultiAgenda).asSingleton()
	const container = builder.build()

	// Assert
	const calendar = container.get(Calendar)
	const agenda = container.get(Agenda)
	const clock = container.get(Clock)
	const agenda2 = container.get(Agenda)
	const multiAgenda = container.get(MultiAgenda)
	expect(calendar.rand).toBe(agenda.calendar.rand)
	expect(clock.rand).toBe(agenda.clock.rand)
	expect(agenda.rand).toBe(agenda2.rand)
	expect(multiAgenda.agenda1.rand).toBe(multiAgenda.agenda2.rand)
	expect(multiAgenda.agenda1.clock.rand).toBe(multiAgenda.agenda2.clock.rand)
	expect(multiAgenda.agenda1.clock.rand).toBe(clock.rand)
	expect(multiAgenda.agenda2.clock.rand).toBe(clock.rand)
})

test('per request services will be always the same instance within each `get` request', () => {
	// Arrange
	const builder = new ContainerBuilder()

	// Act
	builder.registerAndUse(Calendar).asSingleton()
	builder
		.register(Clock)
		.useFactory(() => new Clock())
		.asInstancePerRequest()
	builder
		.register(Agenda)
		.useFactory((c) => new Agenda(c.get(Clock), c.get(Calendar)))
		.asInstancePerRequest()
	builder.registerAndUse(MultiAgenda).asInstancePerRequest()
	const container = builder.build()

	// Assert
	const calendar = container.get(Calendar)
	const agenda = container.get(Agenda)
	const clock = container.get(Clock)
	const agenda2 = container.get(Agenda)
	const multiAgenda = container.get(MultiAgenda)
	expect(calendar.rand).toBe(agenda.calendar.rand)
	expect(clock.rand).not.toBe(agenda.clock.rand)
	expect(agenda.rand).not.toBe(agenda2.rand)
	expect(multiAgenda.agenda1.rand).toBe(multiAgenda.agenda2.rand)
	expect(multiAgenda.agenda1.clock.rand).toBe(multiAgenda.agenda2.clock.rand)
	expect(multiAgenda.agenda1.clock.rand).toBe(multiAgenda.clock.rand)
	expect(multiAgenda.agenda1.clock.rand).not.toBe(clock.rand)
	expect(multiAgenda.agenda2.clock.rand).not.toBe(clock.rand)
	expect(multiAgenda.agenda1.calendar.rand).toBe(calendar.rand)
	expect(multiAgenda.agenda2.calendar.rand).toBe(calendar.rand)
})
