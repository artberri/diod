import { Buildable, ServiceData } from '../internal-types'
import { getDependencies, getDependencyCount } from '../reflection'
import { RegistrationType } from '../registration-type'
import { BuildOptions, Identifier, Newable } from '../types'
import { ServiceConfiguration } from './service-configuration'

export class ClassConfiguration<T> extends ServiceConfiguration<T> {
  private dependencies: Array<Identifier<unknown>> = []
  private autowire = true

  private constructor(private readonly newable: Newable<T>) {
    super()
  }

  /**
   * Declare class dependencies manually
   * @param dependencies List of class dependency identifiers to inject in
   * order to the constructor.
   * @returns
   */
  public withDependencies(
    dependencies: Array<Identifier<unknown>>
  ): ClassConfiguration<T> {
    this.dependencies = dependencies
    this.autowire = false
    return this
  }

  private setDependencyInformationIfNotExist(
    identifier: Newable<T>,
    options: BuildOptions
  ): void {
    const autowire = options.autowire && this.autowire
    if (
      !autowire &&
      getDependencyCount(this.newable) > this.dependencies.length
    ) {
      throw new Error(
        `Dependencies must be provided for non autowired services. Service with missing dependencies: ${identifier.name}`
      )
    }

    if (autowire) {
      this.dependencies = getDependencies(this.newable)
    }
  }

  protected build(options: BuildOptions): ServiceData<T> {
    this.setDependencyInformationIfNotExist(this.newable, options)

    return {
      type: RegistrationType.Class,
      class: this.newable,
      dependencies: this.dependencies,
      autowire: this.autowire,
    }
  }

  /**
   * @internal
   */
  public static createBuildable<TIdentifier>(
    newable: Newable<TIdentifier>
  ): Buildable<ClassConfiguration<TIdentifier>, TIdentifier> {
    const use = new ClassConfiguration(newable)
    return {
      instance: use,
      build: (options: BuildOptions): ServiceData<TIdentifier> =>
        use.build(options),
    }
  }
}
