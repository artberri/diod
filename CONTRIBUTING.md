# Contributing to DIoD

## Setup

1. Fork of the repository

2. Clone your fork of the repository

   ```sh
   git clone https://github.com/YOUR_USERNAME/diod.git
   ```

3. Go to the project root folder

   ```sh
   cd diod
   ```

4. Configure git hooks

   ```sh
   git config core.hooksPath .githooks
   ```

5. Install npm dependencies

   ```sh
   npm ci
   ```

## Guidelines

- Please try to [combine multiple commits before pushing](http://stackoverflow.com/questions/6934752/combining-multiple-commits-before-pushing-in-git)
- Please use `TDD` when fixing bugs. This means that you should write a unit test that fails because it reproduces the issue, then fix the issue and finally run the test to ensure that the issue has been resolved. This helps us prevent fixed bugs from happening again in the future.
- Please keep the test coverage at 100%. Write additional unit tests if necessary.
- Please commit using [Conventional commits](https://www.conventionalcommits.org/en/v1.0.0/)
