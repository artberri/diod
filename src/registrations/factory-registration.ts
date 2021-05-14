import { Factory, RegistrationType, ServiceData } from '../types'
import { BuildableRegistration, Registration } from './registration'

export class FactoryRegistration<T> extends Registration<T> {
  private constructor(private readonly factory: Factory<T>) {
    super()
  }

  protected build(): ServiceData<T> {
    if (this.identifier === undefined) {
      throw new Error(
        `There is a factory registration is not completed. Ensure all of them are registered as something: .as(Something)`
      )
    }

    return {
      type: RegistrationType.Factory,
      identifier: this.identifier,
      factory: this.factory,
      dependencies: [],
    }
  }

  public static createBuildable<TCreate>(
    factory: Factory<TCreate>
  ): BuildableRegistration<FactoryRegistration<TCreate>, TCreate> {
    const registration = new FactoryRegistration(factory)
    return {
      registration,
      build: (): ServiceData<TCreate> => registration.build(),
    }
  }
}
