import { Buildable, Factory, RegistrationType, ServiceData } from '../types'
import { Use } from './use'

export class UseFactory<T> extends Use<T> {
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

  public static createBuildable<TIdentifier>(
    factory: Factory<TIdentifier>
  ): Buildable<UseFactory<TIdentifier>, TIdentifier> {
    const use = new UseFactory(factory)
    return {
      instance: use,
      build: (): ServiceData<TIdentifier> => use.build(),
    }
  }
}
