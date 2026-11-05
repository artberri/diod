import 'reflect-metadata'
import { expect, test } from 'vitest'
import { ContainerBuilder } from '../src/diod'
import { Agenda, Schedule } from './fixtures/agenda'
import {
	Circular1,
	Circular2,
	Circular3,
	circular1,
	circular2,
} from './fixtures/circular'
import { Clock } from './fixtures/clock'
import { Routes } from './fixtures/extended-classes'
import { NotDecorated } from './fixtures/not-decorated'
import { NotPerson } from './fixtures/not-person'
import { BankUser } from './fixtures/user'

test('throws error when there is not completed registration', () => {
	// Arrange
	const builder = new ContainerBuilder()
	builder.register(NotDecorated)

	// Assert
	expect(() => {
		// Act
		builder.build()
	}).toThrow(
		new Error(
			'Service NotDecorated registration is not completed. Use .registerAndUse(NotDecorated) instead of .register(NotDecorated) to use it directly or set any other registration use',
		),
	)
})

test('throws error when asked for a not decorated service with constructor dependencies', () => {
	// Arrange
	const builder = new ContainerBuilder()
	builder.registerAndUse(NotDecorated)

	// Assert
	expect(() => {
		// Act
		builder.build()
	}).toThrow(new Error('Service not decorated: NotDecorated'))
})

test('throws error building a container with a registered service which has unregistered dependencies', () => {
	// Arrange
	const builder = new ContainerBuilder()
	builder.registerAndUse(Agenda)

	// Assert
	expect(() => {
		// Act
		builder.build()
	}).toThrow(
		new Error(
			'Service not registered for the following dependencies of Agenda: Clock, Calendar',
		),
	)
})

test('throws error building a container with a registered service which has a dependency with unregistered dependencies', () => {
	// Arrange
	const builder = new ContainerBuilder()
	builder.register(Schedule).use(Schedule)
	builder.register(Agenda).use(Agenda)

	// Assert
	expect(() => {
		// Act
		builder.build()
	}).toThrow(
		new Error(
			'Service not registered for the following dependencies of Agenda: Clock, Calendar',
		),
	)
})

test('throws error when service without contructor extends not decorated service with constructor dependencies', () => {
	// Arrange
	const builder = new ContainerBuilder()
	builder.registerAndUse(NotPerson)

	// Assert
	expect(() => {
		// Act
		builder.build()
	}).toThrow(new Error('Service not decorated: NotPerson -> NotDecorated'))
})

test('does not throw error when service with contructor without parameters extends not decorated service with constructor dependencies', () => {
	// Arrange
	const builder = new ContainerBuilder()
	builder.registerAndUse(Routes)
	const container = builder.build()

	// Act
	const routes = container.get(Routes)

	// Assert
	expect(routes.constructor.name).toBe('Routes')
	expect(routes.getRoute()).toBe('aRoute')
})

test('throws error when needed dependencies are not provided for non autowired service', () => {
	// Arrange
	const builder = new ContainerBuilder()
	builder.registerAndUse(BankUser)

	// Assert
	expect(() => {
		// Act
		builder.build({ autowire: false })
	}).toThrow(
		new Error(
			'Dependencies must be provided for non autowired services. Service with missing dependencies: BankUser',
		),
	)
})

test('throws error if circular dependencies are detected', () => {
	// Arrange
	const builder = new ContainerBuilder()
	builder.registerAndUse(Circular1).withDependencies([Circular2])
	builder.registerAndUse(Circular2).withDependencies([Circular3])
	builder.registerAndUse(Circular3).withDependencies([Circular1])

	// Assert
	expect(() => {
		// Act
		builder.build({ autowire: false })
	}).toThrow(
		new Error(
			'Circular dependency detected: Circular1 -> Circular2 -> Circular3 -> Circular1',
		),
	)
})

test('does not throw circular dependency error when different classes with the same name are used', () => {
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
	expect(() => {
		// Act
		builder.build({ autowire: false })
	}).not.toThrow()
})

test('throws error if service is registered twice', () => {
	// Arrange
	const builder = new ContainerBuilder()
	builder.registerAndUse(Clock)

	// Assert
	expect(() => {
		// Act
		builder.registerAndUse(Clock)
	}).toThrow(
		new Error(
			'A service identified as Clock has been already registered. You need to unregister it before you can register it again.',
		),
	)
})

test('throws unregistering not registered service', () => {
	// Arrange
	const builder = new ContainerBuilder()
	builder.registerAndUse(Clock)

	// Assert
	expect(() => {
		// Act
		builder.unregister(Circular1)
	}).toThrow(new Error('There is no service registered as Circular1.'))
})

test('throws unregistering not registered service', () => {
	// Arrange
	const builder = new ContainerBuilder()
	builder.registerAndUse(Clock)

	// Assert
	expect(() => {
		// Act
		builder.unregister(Circular1)
	}).toThrow(new Error('There is no service registered as Circular1.'))
})

test('services can be unregistered', () => {
	// Arrange
	const builder = new ContainerBuilder()
	builder.registerAndUse(Clock)

	// Act
	builder.unregister(Clock)

	// Assert
	expect(builder.isRegistered(Clock)).toBe(false)
})

test('can query if a service is registered', () => {
	// Arrange
	const builder = new ContainerBuilder()
	builder.registerAndUse(Clock)

	// Act
	const isClockRegistered = builder.isRegistered(Clock)
	const isCircular1Registered = builder.isRegistered(Circular1)

	// Assert
	expect(isClockRegistered).toBe(true)
	expect(isCircular1Registered).toBe(false)
})
