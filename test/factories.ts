import 'reflect-metadata'
import tap from 'tap'
import { ContainerBuilder } from '../src/diod'
import { Agenda } from './fixtures/agenda'
import { Calendar } from './fixtures/calendar'
import { Clock } from './fixtures/clock'

void tap.test('returns instances created with factories', (t) => {
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
	t.equal(container.get(Agenda).constructor.name, 'Agenda')
	t.end()
})
