import 'reflect-metadata'
import tap from 'tap'
import { ContainerBuilder } from '../src/diod'
import { Agenda } from './fixtures/agenda'
import { Calendar } from './fixtures/calendar'
import { Clock } from './fixtures/clock'

void tap.test(
	'only public services can be directly queried from the container',
	(t) => {
		// Arrange
		const builder = new ContainerBuilder()

		// Act
		builder.registerAndUse(Agenda).public()
		builder.registerAndUse(Clock).public()
		builder.registerAndUse(Calendar).private()
		const container = builder.build()

		// Assert
		const agenda = container.get(Agenda)
		t.equal(agenda.clock.constructor.name, 'Clock')
		t.equal(agenda.calendar.constructor.name, 'Calendar')
		const clock = container.get(Clock)
		t.equal(clock.constructor.name, 'Clock')
		t.throws(() => {
			// Act
			container.get(Calendar)
		}, new Error('The Calendar service has been registered as private and can not be directly get from the container'))
		t.end()
	},
)
