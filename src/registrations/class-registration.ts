import { getDependencies, getDependencyCount } from '../reflection'
import {
  Abstract,
  BuildOptions,
  Newable,
  RegistrationType,
  ServiceData,
} from '../types'
import { BuildableRegistration, Registration } from './registration'

export class ClassRegistration<T> extends Registration<T> {
  private dependencies: Array<Abstract<unknown>> = []
  private autowire = true

  private constructor(private readonly newable: Newable<T>) {
    super()
  }

  public asSelf(): ClassRegistration<T> {
    this.identifier = this.newable
    return this
  }

  public withDependencies(
    dependencies: Array<Abstract<unknown>>
  ): ClassRegistration<T> {
    this.dependencies = dependencies
    this.autowire = false
    return this
  }

  private setDependencyInformationIfNotExist(
    identifier: Abstract<T>,
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
    if (this.identifier === undefined) {
      throw new Error(
        `Service ${this.newable.name} registration is not completed. Use .asSelf() or .as(SomeAbstraction) to finish its registration`
      )
    }

    this.setDependencyInformationIfNotExist(this.identifier, options)

    return {
      type: RegistrationType.Class,
      identifier: this.identifier,
      class: this.newable,
      dependencies: this.dependencies,
      autowire: this.autowire,
    }
  }

  public static createBuildable<TCreate>(
    newable: Newable<TCreate>
  ): BuildableRegistration<ClassRegistration<TCreate>, TCreate> {
    const registration = new ClassRegistration(newable)
    return {
      registration,
      build: (options: BuildOptions): ServiceData<TCreate> =>
        registration.build(options),
    }
  }
}
