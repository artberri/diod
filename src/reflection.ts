import type { Abstract } from './types'

const PARAM_TYPES = 'design:paramtypes'

const getDependenciesFromDecoratedServiceOrThrow = <T>(
	target: Abstract<T>,
	parents: string[],
): Abstract<unknown>[] => {
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

function stripComments(code: string): string {
	const codeWithoutSingleLineComments = code.replace(/\/\/.*$/gm, '')
	const codeWithoutComments = codeWithoutSingleLineComments.replace(
		/\/\*[\s\S]*?\*\//g,
		'',
	)

	return codeWithoutComments
}

// This function is used to determine if a class has a constructor without parameters
// not derived from a base class. It is a hacky way to determine if a class has a constructor
// defined. Open to suggestions on how to improve this.
const hasOwnConstructorWithoutParams = <T>(target: Abstract<T>): boolean => {
	const prototype = target.prototype as object
	const classString = stripComments(prototype.constructor.toString())
	const constructorRegex = /\s*constructor\s*\(\s*\)\s*\{/

	return constructorRegex.test(classString)
}

export const getDependencies = <T>(
	target: Abstract<T>,
	parents: string[] = [],
): Abstract<unknown>[] => {
	const dependencies = getDependenciesFromDecoratedServiceOrThrow(
		target,
		parents,
	)

	if (dependencies.length > 0) {
		return dependencies
	}

	if (hasOwnConstructorWithoutParams(target)) {
		return []
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
