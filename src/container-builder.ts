import { Container } from './container'
import { buildMetadata } from './metadata-builder'
import {
  BuildOptions,
  Newable,
  RegisterOptions,
  ServiceIdentifier,
  ServiceRegistration,
} from './types'
import { verify } from './verifier'

const getRegisterOptions = (
  optionsOrDependencies?: RegisterOptions | Array<ServiceIdentifier<unknown>>
): RegisterOptions => {
  if (Array.isArray(optionsOrDependencies)) {
    return {
      autowire: false,
      dependencies: optionsOrDependencies,
    }
  }

  return optionsOrDependencies || { autowire: true, dependencies: [] }
}

export class ContainerBuilder {
  private readonly registrations: Set<ServiceRegistration<unknown>> = new Set<
    ServiceRegistration<unknown>
  >()

  public register<T>(implementation: Newable<T>): void
  public register<T>(implementation: Newable<T>, options: RegisterOptions): void
  public register<T>(
    implementation: Newable<T>,
    dependencies: Array<ServiceIdentifier<unknown>>
  ): void
  public register<T>(
    implementation: Newable<T>,
    optionsOrDependencies?: RegisterOptions | Array<ServiceIdentifier<unknown>>
  ): void {
    const options = getRegisterOptions(optionsOrDependencies)
    this.registrations.add({
      implementation,
      identifier: implementation,
      autowire: options.autowire,
      dependencies: options.dependencies,
    })
  }

  public build(options: BuildOptions = {}): Container {
    options.autowire = options.autowire ?? true
    const services = buildMetadata(this.registrations, options)
    verify(services)
    return new Container(services)
  }
}
