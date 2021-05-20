import { Buildable, ServiceData } from '../internal-types'
import { RegistrationType } from '../registration-type'
import { Instance } from '../types'
import { ServiceConfiguration } from './service-configuration'

export class InstanceConfiguration<T> extends ServiceConfiguration<T> {
  private constructor(private readonly instance: Instance<T>) {
    super()
  }

  protected build(): ServiceData<T> {
    return {
      type: RegistrationType.Instance,
      instance: this.instance,
      dependencies: [],
    }
  }

  /**
   * @internal
   */
  public static createBuildable<TIdentifier>(
    instance: Instance<TIdentifier>
  ): Buildable<InstanceConfiguration<TIdentifier>, TIdentifier> {
    const use = new InstanceConfiguration(instance)
    return {
      instance: use,
      build: (): ServiceData<TIdentifier> => use.build(),
    }
  }
}
