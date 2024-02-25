# Changelog

All notable changes to DIOD project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [3.0.0] - ???

### Breaking changes

- Drop support for Node.js v17 and lower.

### Changed

- Dev dependencies updated.

## [2.0.0] - 2022-11-08

### Breaking changes

- Target `es2016`.
- Drop support for Node.js v12 and lower.

### Changed

- Dev dependencies updated.

## [1.0.2] - 2021-08-29

### Changed

- Dev dependencies updated.

### Fixed

- Unexpected error: TypeError: Cannot read property 'dependencies' of undefined if a direct dependency is missing other dependency ([#3](https://github.com/artberri/diod/issues/3)) from [@alemarcha](https://github.com/alemarcha).

## [1.0.1] - 2021-08-05

### Added

- This CHANGELOG file.

### Changed

- Dev dependencies updated.

### Fixed

- Circular dependency detection expects unique class names ([#1](https://github.com/artberri/diod/issues/1)) from [@witrin](https://github.com/witrin).

## [1.0.0] - 2021-06-03

### Added

- First version.

[unreleased]: https://github.com/artberri/diod/compare/v2.0.0...HEAD
[2.0.0]: https://github.com/artberri/diod/compare/v1.0.2...v2.0.0
[1.0.2]: https://github.com/artberri/diod/compare/v1.0.1...v1.0.2
[1.0.1]: https://github.com/artberri/diod/compare/v1.0.0...v1.0.1
[1.0.0]: https://github.com/artberri/diod/releases/tag/v1.0.0
