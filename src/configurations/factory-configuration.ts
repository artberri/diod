import { Buildable, ServiceData } from '../internal-types'
import { RegistrationType } from '../registration-type'
import { ScopeType } from '../scope-type'
import { Factory } from '../types'
import { ServiceConfiguration } from './service-configuration'
import { WithScopeChange } from './with-scope-change'

export class FactoryConfiguration<T>
  extends ServiceConfiguration<T>
  implements WithScopeChange<FactoryConfiguration<T>> {
  protected scope = ScopeType.Transient

  private constructor(private readonly factory: Factory<T>) {
    super()
  }

  /**
   * Configure the service so that always gets a new instance.
   * @returns
   */
  public asTransient(): this {
    return super.asTransient()
  }

  /**
   * Configure the service so that always gets the same, shared instance.
   * @returns
   */
  public asSingleton(): this {
    return super.asSingleton()
  }

  /**
   * Configure the service so that the same shared instance is used during
   * within a [[Container]].get request.
   * @returns
   */
  public asInstancePerRequest(): this {
    return super.asInstancePerRequest()
  }

  protected build(): ServiceData<T> {
    return {
      scope: this.scope,
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
