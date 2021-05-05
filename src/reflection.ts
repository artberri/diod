import { ServiceIdentifier } from './types'

/* eslint-disable @typescript-eslint/ban-types */
const PARAM_TYPES = 'design:paramtypes'

export const getDependencies = (
  target: Object
): Array<ServiceIdentifier<unknown>> => {
  return Reflect.getMetadata(PARAM_TYPES, target) || []
}
