import 'reflect-metadata'
import tap from 'tap'
import { ContainerBuilder } from '../src/diod'
import { AutoRegisteredServiceSample } from './fixtures/autoregistered-services'
import { autoregister } from './fixtures/register-service-decorator'

void tap.test('autoregisters classes with custom decorator', (t) => {
	// Act
	const builder = new ContainerBuilder()
	autoregister(builder)
	const container = builder.build()

	// Assert
	const service = container.get(AutoRegisteredServiceSample)
	t.equal(service.constructor.name, 'AutoRegisteredServiceSample')
	t.not(service.now(), '')
	t.end()
})
