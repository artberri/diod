import 'reflect-metadata'
import tap from 'tap'
import { ContainerBuilder } from '../src/diod'
import { OtherServiceWithCustomDecorator } from './fixtures/other-service-with-custom-decorator'
import { ServiceWithCustomDecorator } from './fixtures/service-with-custom-decorator'
import { Truer } from './fixtures/truer'

tap.test('user defined decorators can be used', (t) => {
  // Arrange
  const builder = new ContainerBuilder()
  builder.registerAndUse(ServiceWithCustomDecorator)
  builder.register(Truer).use(OtherServiceWithCustomDecorator)
  const container = builder.build()

  // Act
  const service = container.get(ServiceWithCustomDecorator)

  // Assert
  t.equal(service.constructor.name, 'ServiceWithCustomDecorator')
  t.equal(service.execDep(), true)
  t.end()
})
