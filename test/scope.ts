import 'reflect-metadata'
import tap from 'tap'
import { ContainerBuilder } from '../src/diod'
import { Agenda } from './fixtures/agenda'
import { Calendar } from './fixtures/calendar'
import { Clock } from './fixtures/clock'
import { MultiAgenda } from './fixtures/multi-agenda'

void tap.test(
	'transient services will be always created as new instances',
	(t) => {
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
		t.not(calendar.rand, agenda.calendar.rand)
		t.not(clock.rand, agenda.clock.rand)
		t.not(agenda.rand, agenda2.rand)
		t.not(multiAgenda.agenda1.rand, multiAgenda.agenda2.rand)
		t.not(multiAgenda.agenda1.clock.rand, multiAgenda.agenda2.clock.rand)
		t.not(multiAgenda.agenda1.clock.rand, clock.rand)
		t.end()
	},
)

void tap.test('singleton services will be always the same instance', (t) => {
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
	t.equal(calendar.rand, agenda.calendar.rand)
	t.equal(clock.rand, agenda.clock.rand)
	t.equal(agenda.rand, agenda2.rand)
	t.equal(multiAgenda.agenda1.rand, multiAgenda.agenda2.rand)
	t.equal(multiAgenda.agenda1.clock.rand, multiAgenda.agenda2.clock.rand)
	t.equal(multiAgenda.agenda1.clock.rand, clock.rand)
	t.equal(multiAgenda.agenda2.clock.rand, clock.rand)
	t.end()
})

void tap.test(
	'per request services will be always the same instance within each `get` request',
	(t) => {
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
		t.equal(calendar.rand, agenda.calendar.rand)
		t.not(clock.rand, agenda.clock.rand)
		t.not(agenda.rand, agenda2.rand)
		t.equal(multiAgenda.agenda1.rand, multiAgenda.agenda2.rand)
		t.equal(multiAgenda.agenda1.clock.rand, multiAgenda.agenda2.clock.rand)
		t.equal(multiAgenda.agenda1.clock.rand, multiAgenda.clock.rand)
		t.not(multiAgenda.agenda1.clock.rand, clock.rand)
		t.not(multiAgenda.agenda2.clock.rand, clock.rand)
		t.equal(multiAgenda.agenda1.calendar.rand, calendar.rand)
		t.equal(multiAgenda.agenda2.calendar.rand, calendar.rand)
		t.end()
	},
)
