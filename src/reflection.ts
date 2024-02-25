import { Abstract } from './types'

const PARAM_TYPES = 'design:paramtypes'

const getDependenciesFromDecoratedServiceOrThrow = <T>(
	target: Abstract<T>,
	parents: string[],
): Array<Abstract<unknown>> => {
	const dependencies = Reflect.getMetadata(PARAM_TYPES, target) || []
	if (dependencies.length < target.length) {
		throw new Error(
			`Service not decorated: ${[...parents, target.name].join(' -> ')}`,
		)
	}

	return dependencies
}

const getBaseClass = <T extends B, B>(
	target: Abstract<T>,
): Abstract<B> | undefined => {
	const baseClass = Object.getPrototypeOf(target.prototype).constructor
	if (baseClass === Object) {
		return undefined
	}

	return baseClass
}

export const getDependencies = <T>(
	target: Abstract<T>,
	parents: string[] = [],
): Array<Abstract<unknown>> => {
	const dependencies = getDependenciesFromDecoratedServiceOrThrow(
		target,
		parents,
	)

	if (dependencies.length > 0) {
		return dependencies
	}

	const baseClass = getBaseClass(target)
	if (baseClass) {
		return getDependencies(baseClass, [...parents, target.name])
	}

	return []
}

export const getDependencyCount = <T>(target: Abstract<T>): number => {
	if (target.length > 0) {
		return target.length
	}

	const baseClass = getBaseClass(target)
	if (baseClass) {
		return getDependencyCount(baseClass)
	}

	return 0
}
