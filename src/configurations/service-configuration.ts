import { ServiceData } from '../internal-types'
import { BuildOptions } from '../types'

export abstract class ServiceConfiguration<T> {
  protected abstract build(options: BuildOptions): ServiceData<T>
}
