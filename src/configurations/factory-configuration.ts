import { Buildable, ServiceData } from '../internal-types'
import { RegistrationType } from '../registration-type'
import { Factory } from '../types'
import { ServiceConfiguration } from './service-configuration'

export class FactoryConfiguration<T> extends ServiceConfiguration<T> {
  private constructor(private readonly factory: Factory<T>) {
    super()
  }

  protected build(): ServiceData<T> {
    return {
      type: RegistrationType.Factory,
      factory: this.factory,
      dependencies: [],
    }
  }

  /**
   * @internal
   */
  public static createBuildable<TIdentifier>(
    factory: Factory<TIdentifier>
  ): Buildable<FactoryConfiguration<TIdentifier>, TIdentifier> {
    const use = new FactoryConfiguration(factory)
    return {
      instance: use,
      build: (): ServiceData<TIdentifier> => use.build(),
    }
  }
}
