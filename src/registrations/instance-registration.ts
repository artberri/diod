import { Instance, RegistrationType, ServiceData } from '../types'
import { BuildableRegistration, Registration } from './registration'

export class InstanceRegistration<T> extends Registration<T> {
  private constructor(private readonly instance: Instance<T>) {
    super()
  }

  protected build(): ServiceData<T> {
    if (this.identifier === undefined) {
      throw new Error(
        `There is a instance registration is not completed. Ensure all of them are registered as something: .as(Something)`
      )
    }

    return {
      type: RegistrationType.Instance,
      identifier: this.identifier,
      instance: this.instance,
      dependencies: [],
    }
  }

  public static createBuildable<TCreate>(
    instance: Instance<TCreate>
  ): BuildableRegistration<InstanceRegistration<TCreate>, TCreate> {
    const registration = new InstanceRegistration(instance)
    return {
      registration,
      build: (): ServiceData<TCreate> => registration.build(),
    }
  }
}
