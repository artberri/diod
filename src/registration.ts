import { ClassConfiguration } from './configurations/class-configuration'
import { FactoryConfiguration } from './configurations/factory-configuration'
import { InstanceConfiguration } from './configurations/instance-configuration'
import { ServiceConfiguration } from './configurations/service-configuration'
import { Buildable, ServiceData } from './internal-types'
import {
  BuildOptions,
  ConfigurableRegistration,
  Factory,
  Identifier,
  Instance,
  Newable,
  Registration,
  WithDependencies,
  WithScopeChange,
} from './types'

export class DiodRegistration<T> implements Registration<T> {
  private buildable: Buildable<ServiceConfiguration<T>, T> | undefined

  private constructor(public readonly identifier: Identifier<T>) {}

  public useClass(
    newable: Newable<T>
  ): ConfigurableRegistration & WithScopeChange & WithDependencies {
    const buildable = ClassConfiguration.createBuildable(newable)
    this.buildable = buildable
    return buildable.instance
  }

  public use(
    newable: Newable<T>
  ): ConfigurableRegistration & WithScopeChange & WithDependencies {
    return this.useClass(newable)
  }

  public useInstance(instance: Instance<T>): ConfigurableRegistration {
    const buildable = InstanceConfiguration.createBuildable(instance)
    this.buildable = buildable
    return buildable.instance
  }

  public useFactory(
    factory: Factory<T>
  ): ConfigurableRegistration & WithScopeChange {
    const buildable = FactoryConfiguration.createBuildable(factory)
    this.buildable = buildable
    return buildable.instance
  }

  private build(options: BuildOptions): ServiceData<T> {
    if (this.buildable === undefined) {
      throw new Error(
        `Service ${this.identifier.name} registration is not completed. Use .registerAndUse(${this.identifier.name}) instead of .register(${this.identifier.name}) to use it directly or set any other registration use`
      )
    }

    return this.buildable.build(options)
  }

  public static createBuildable<TIdentifier>(
    identifier: Identifier<TIdentifier>
  ): Buildable<Registration<TIdentifier>, TIdentifier> {
    const registration = new DiodRegistration(identifier)
    return {
      instance: registration,
      build: (options: BuildOptions): ServiceData<TIdentifier> =>
        registration.build(options),
    }
  }
}
