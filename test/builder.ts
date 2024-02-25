import 'reflect-metadata'
import tap from 'tap'
import { ContainerBuilder } from '../src/diod'
import { Agenda, Schedule } from './fixtures/agenda'
import {
	circular1,
	Circular1,
	circular2,
	Circular2,
	Circular3,
} from './fixtures/circular'
import { Clock } from './fixtures/clock'
import { NotDecorated } from './fixtures/not-decorated'
import { NotPerson } from './fixtures/not-person'
import { BankUser } from './fixtures/user'

void tap.test('throws error when there is not completed registration', (t) => {
	// Arrange
	const builder = new ContainerBuilder()
	builder.register(NotDecorated)

	// Assert
	t.throws(() => {
		// Act
		builder.build()
	}, new Error('Service NotDecorated registration is not completed. Use .registerAndUse(NotDecorated) instead of .register(NotDecorated) to use it directly or set any other registration use'))
	t.end()
})

void tap.test(
	'throws error when asked for a not decorated service with constructor dependencies',
	(t) => {
		// Arrange
		const builder = new ContainerBuilder()
		builder.registerAndUse(NotDecorated)

		// Assert
		t.throws(() => {
			// Act
			builder.build()
		}, new Error('Service not decorated: NotDecorated'))
		t.end()
	},
)

void tap.test(
	'throws error building a container with a registered service which has unregistered dependencies',
	(t) => {
		// Arrange
		const builder = new ContainerBuilder()
		builder.registerAndUse(Agenda)

		// Assert
		t.throws(() => {
			// Act
			builder.build()
		}, new Error('Service not registered for the following dependencies of Agenda: Clock, Calendar'))
		t.end()
	},
)

void tap.test(
	'throws error building a container with a registered service which has a dependency with unregistered dependencies',
	(t) => {
		// Arrange
		const builder = new ContainerBuilder()
		builder.register(Schedule).use(Schedule)
		builder.register(Agenda).use(Agenda)

		// Assert
		t.throws(() => {
			// Act
			builder.build()
		}, new Error('Service not registered for the following dependencies of Agenda: Clock'))
		t.end()
	},
)

void tap.test(
	'throws error when service without contructor extends not decorated service with constructor dependencies',
	(t) => {
		// Arrange
		const builder = new ContainerBuilder()
		builder.registerAndUse(NotPerson)

		// Assert
		t.throws(() => {
			// Act
			builder.build()
		}, new Error('Service not decorated: NotPerson -> NotDecorated'))
		t.end()
	},
)

void tap.test(
	'throws error when needed dependencies are not provided for non autowired service',
	(t) => {
		// Arrange
		const builder = new ContainerBuilder()
		builder.registerAndUse(BankUser)

		// Assert
		t.throws(() => {
			// Act
			builder.build({ autowire: false })
		}, new Error('Dependencies must be provided for non autowired services. Service with missing dependencies: BankUser'))
		t.end()
	},
)

void tap.test('throws error if circular dependencies are detected', (t) => {
	// Arrange
	const builder = new ContainerBuilder()
	builder.registerAndUse(Circular1).withDependencies([Circular2])
	builder.registerAndUse(Circular2).withDependencies([Circular3])
	builder.registerAndUse(Circular3).withDependencies([Circular1])

	// Assert
	t.throws(() => {
		// Act
		builder.build({ autowire: false })
	}, new Error('Circular dependency detected: Circular1 -> Circular2 -> Circular3 -> Circular1'))
	t.end()
})

void tap.test(
	'does not throw circular dependency error when different classes with the same name are used',
	(t) => {
		// Arrange
		const builder = new ContainerBuilder()
		builder.registerAndUse(circular1.Circular1)
		builder
			.registerAndUse(circular2.Circular1)
			.withDependencies([circular2.Circular2])
		builder
			.registerAndUse(circular2.Circular2)
			.withDependencies([circular1.Circular1])

		// Assert
		t.doesNotThrow(() => {
			// Act
			builder.build({ autowire: false })
		})
		t.end()
	},
)

void tap.test('throws error if service is registered twice', (t) => {
	// Arrange
	const builder = new ContainerBuilder()
	builder.registerAndUse(Clock)

	// Assert
	t.throws(() => {
		// Act
		builder.registerAndUse(Clock)
	}, new Error('A service identified as Clock has been already registered. You need to unregister it before you can register it again.'))
	t.end()
})

void tap.test('throws unregistering not registered service', (t) => {
	// Arrange
	const builder = new ContainerBuilder()
	builder.registerAndUse(Clock)

	// Assert
	t.throws(() => {
		// Act
		builder.unregister(Circular1)
	}, new Error('There is no service registered as Circular1.'))
	t.end()
})

void tap.test('throws unregistering not registered service', (t) => {
	// Arrange
	const builder = new ContainerBuilder()
	builder.registerAndUse(Clock)

	// Assert
	t.throws(() => {
		// Act
		builder.unregister(Circular1)
	}, new Error('There is no service registered as Circular1.'))
	t.end()
})

void tap.test('services can be unregistered', (t) => {
	// Arrange
	const builder = new ContainerBuilder()
	builder.registerAndUse(Clock)

	// Act
	builder.unregister(Clock)

	// Assert
	t.equal(builder.isRegistered(Clock), false)
	t.end()
})

void tap.test('can query if a service is registered', (t) => {
	// Arrange
	const builder = new ContainerBuilder()
	builder.registerAndUse(Clock)

	// Act
	const isClockRegistered = builder.isRegistered(Clock)
	const isCircular1Registered = builder.isRegistered(Circular1)

	// Assert
	t.equal(isClockRegistered, true)
	t.equal(isCircular1Registered, false)
	t.end()
})
