import 'reflect-metadata'
import tap from 'tap'
import { ContainerBuilder } from '../src/diod'
import { Agenda } from './fixtures/agenda'
import { Calendar } from './fixtures/calendar'
import { Clock } from './fixtures/clock'

void tap.test('returns registered instance with basic dependencies', (t) => {
	// Arrange
	const builder = new ContainerBuilder()
	builder.register(Clock).use(Clock)
	builder.registerAndUse(Calendar)
	builder.register(Agenda).useClass(Agenda)
	const container = builder.build()

	// Act
	const agenda = container.get(Agenda)

	// Assert
	t.equal(agenda.constructor.name, 'Agenda')
	t.not(agenda.now(), '')
	t.end()
})
