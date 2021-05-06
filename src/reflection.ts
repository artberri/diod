import { ServiceIdentifier } from './types'

const PARAM_TYPES = 'design:paramtypes'

const getDependenciesFromDecoratedServiceOrThrow = <T>(
  target: ServiceIdentifier<T>
): Array<ServiceIdentifier<unknown>> => {
  const dependencies = Reflect.getMetadata(PARAM_TYPES, target) || []
  if (dependencies.length < target.length) {
    throw new Error(`Service not decorated: ${target.name}`)
  }

  return dependencies
}

const getBaseClass = <T extends B, B>(
  target: ServiceIdentifier<T>
): ServiceIdentifier<B> | undefined => {
  const baseClass = Object.getPrototypeOf(target.prototype).constructor
  if (baseClass === Object) {
    return undefined
  }

  return baseClass
}

export const getDependencies = <T>(
  target: ServiceIdentifier<T>
): Array<ServiceIdentifier<unknown>> => {
  const dependencies = getDependenciesFromDecoratedServiceOrThrow(target)

  if (dependencies.length > 0) {
    return dependencies
  }

  const baseClass = getBaseClass(target)
  if (baseClass) {
    return getDependencies(baseClass)
  }

  return []
}
