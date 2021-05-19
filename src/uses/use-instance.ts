import { Buildable, ServiceData } from '../internal-types'
import { RegistrationType } from '../registration-type'
import { Instance } from '../types'
import { Use } from './use'

export class UseInstance<T> extends Use<T> {
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

  public static createBuildable<TIdentifier>(
    instance: Instance<TIdentifier>
  ): Buildable<UseInstance<TIdentifier>, TIdentifier> {
    const use = new UseInstance(instance)
    return {
      instance: use,
      build: (): ServiceData<TIdentifier> => use.build(),
    }
  }
}
