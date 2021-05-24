import { Buildable, ServiceData } from '../internal-types'
import { RegistrationType } from '../registration-type'
import { ScopeType } from '../scope-type'
import { Factory, WithScopeChange } from '../types'
import { ServiceConfiguration } from './service-configuration'

export class FactoryConfiguration<T>
  extends ServiceConfiguration<T>
  implements WithScopeChange {
  protected scope = ScopeType.Transient

  private constructor(private readonly factory: Factory<T>) {
    super()
  }

  public asTransient(): this {
    return super.asTransient()
  }

  public asSingleton(): this {
    return super.asSingleton()
  }

  public asInstancePerRequest(): this {
    return super.asInstancePerRequest()
  }

  protected build(): ServiceData<T> {
    return {
      tags: this.tags,
      isPrivate: this.isPrivate,
      scope: this.scope,
      type: RegistrationType.Factory,
      factory: this.factory,
      dependencies: [],
    }
  }

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
