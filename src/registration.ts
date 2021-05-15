import {
  Buildable,
  BuildOptions,
  Identifier,
  Newable,
  ServiceData,
} from './types'
import { Use } from './uses/use'
import { UseClass } from './uses/use-class'

export class Registration<T> {
  private buildable: Buildable<Use<T>, T> | undefined

  private constructor(public readonly identifier: Identifier<T>) {}

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
