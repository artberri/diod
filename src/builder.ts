import { Container } from './container'
import { getDependencies, getDependencyCount } from './reflection'
import {
  BuildOptions,
  Newable,
  RegisterOptions,
  ServiceIdentifier,
  ServiceMetadata,
  ServiceRegistration,
} from './types'
import { Verifier } from './verifier'

export class ContainerBuilder {
  private readonly registrations: Set<ServiceRegistration<unknown>> = new Set<
    ServiceRegistration<unknown>
  >()

  private readonly services: Map<
    ServiceIdentifier<unknown>,
    ServiceMetadata<unknown>
  > = new Map<ServiceIdentifier<unknown>, ServiceMetadata<unknown>>()

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
    const options = this.getRegisterOptions(optionsOrDependencies)
    this.registrations.add({
      implementation,
      identifier: implementation,
      autowire: options.autowire,
      dependencies: options.dependencies,
    })
  }

  public build(options: BuildOptions = {}): Container {
    options.autowire = options.autowire ?? true
    this.buildAllMetadata(options)

    const verifier = new Verifier(this.services)
    verifier.verify()
    return new Container(this.services)
  }

  private getRegisterOptions(
    optionsOrDependencies?: RegisterOptions | Array<ServiceIdentifier<unknown>>
  ): RegisterOptions {
    if (Array.isArray(optionsOrDependencies)) {
      return {
        autowire: false,
        dependencies: optionsOrDependencies,
      }
    }

    return optionsOrDependencies || { autowire: true, dependencies: [] }
  }

  private buildAllMetadata(options: BuildOptions): void {
    for (const registration of this.registrations) {
      this.buildMetadata(registration, options)
    }
  }

  private buildMetadata<T>(
    registration: ServiceRegistration<T>,
    options: BuildOptions
  ): void {
    const autowire = options.autowire && registration.autowire
    if (
      !autowire &&
      registration.implementation &&
      getDependencyCount(registration.identifier) >
        registration.dependencies.length
    ) {
      throw new Error(
        `Dependencies must be provided fot non autowired services. Service with missing dependencies: ${registration.identifier.name}`
      )
    }

    const dependencies = autowire
      ? getDependencies(registration.implementation)
      : registration.dependencies

    this.services.set(registration.identifier, {
      implementation: registration.implementation,
      dependencies,
    })
  }
}
