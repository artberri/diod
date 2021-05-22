import { ServiceData } from '../internal-types'
import { ScopeType } from '../scope-type'
import { BuildOptions } from '../types'

export abstract class ServiceConfiguration<T> {
  protected abstract scope: ScopeType
  protected abstract build(options: BuildOptions): ServiceData<T>

  protected asTransient(): this {
    this.scope = ScopeType.Transient
    return this
  }
  protected asSingleton(): this {
    this.scope = ScopeType.Singleton
    return this
  }
  protected asInstancePerRequest(): this {
    this.scope = ScopeType.Request
    return this
  }
}
