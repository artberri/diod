import { Buildable, ServiceData } from '../internal-types'
import { getDependencies, getDependencyCount } from '../reflection'
import { RegistrationType } from '../registration-type'
import { ScopeType } from '../scope-type'
import { BuildOptions, Identifier, Newable } from '../types'
import { ServiceConfiguration } from './service-configuration'
import { WithScopeChange } from './with-scope-change'

export class ClassConfiguration<T>
  extends ServiceConfiguration<T>
  implements WithScopeChange<ClassConfiguration<T>> {
  protected scope = ScopeType.Transient
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
  public withDependencies(dependencies: Array<Identifier<unknown>>): this {
    this.dependencies = dependencies
    this.autowire = false
    return this
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
      scope: this.scope,
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
