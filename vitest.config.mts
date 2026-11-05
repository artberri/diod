import { defineConfig } from 'vitest/config'

export default defineConfig({
	test: {
		// Top level only: test/fixtures/ holds shared classes, not tests.
		include: ['test/*.ts'],
		restoreMocks: true,
		coverage: {
			provider: 'v8',
			include: ['src/**'],
			reporter: ['text'],
			thresholds: {
				lines: 100,
				branches: 100,
				functions: 100,
				statements: 100,
			},
		},
	},
})
