export const MyAppService = (): ClassDecorator => {
	// biome-ignore lint/complexity/noBannedTypes: <explanation>
	return <TFunction extends Function>(target: TFunction): TFunction => {
		return target
	}
}
