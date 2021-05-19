import { Buildable, ServiceData } from './internal-types'
import { BuildOptions, Factory, Identifier, Instance, Newable } from './types'
import { Use } from './uses/use'
import { UseClass } from './uses/use-class'
import { UseFactory } from './uses/use-factory'
import { UseInstance } from './uses/use-instance'

export class Registration<T> {
  private buildable: Buildable<Use<T>, T> | undefined

  private constructor(public readonly identifier: Identifier<T>) {}

  public useInstance(instance: Instance<T>): UseInstance<T> {
    const buildable = UseInstance.createBuildable(instance)
    this.buildable = buildable
    return buildable.instance
  }

  public useFactory(factory: Factory<T>): UseFactory<T> {
    const buildable = UseFactory.createBuildable(factory)
    this.buildable = buildable
    return buildable.instance
  }

  public useClass(newable: Newable<T>): UseClass<T> {
    const buildable = UseClass.createBuildable(newable)
    this.buildable = buildable
    return buildable.instance
  }

  public use(newable: Newable<T>): UseClass<T> {
    return this.useClass(newable)
  }

  private build(options: BuildOptions): ServiceData<T> {
    if (this.buildable === undefined) {
      throw new Error(
        `Service ${this.identifier.name} registration is not completed. Use .registerAndUse(${this.identifier.name}) instead of .register(${this.identifier.name}) to use it directly or set any other registration use`
      )
    }

    return this.buildable.build(options)
  }

  /**
   * @internal
   */
  public static createBuildable<TIdentifier>(
    identifier: Identifier<TIdentifier>
  ): Buildable<Registration<TIdentifier>, TIdentifier> {
    const registration = new Registration(identifier)
    return {
      instance: registration,
      build: (options: BuildOptions): ServiceData<TIdentifier> =>
        registration.build(options),
    }
  }
}
