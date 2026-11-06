/**
 * Decorator for injectable classes. Every registered service must
 * be decorated because without decorators Typescript won't emit
 * constructor metadata.
 * @returns
 */
export const Service = (): ClassDecorator => {
	// biome-ignore lint/complexity/noBannedTypes: must match the TypeScript ClassDecorator signature, which uses Function
	return <TFunction extends Function>(target: TFunction): TFunction => {
		return target
	}
}
