---
name: release
description: Prepare and cut a DIOD release to npm and JSR. Bumps the version in package.json and jsr.json, dates the CHANGELOG, pushes, then guides the signed tag, the GitHub release and the npm stage approval. Use when the user asks to release, publish, cut or prepare a new version (for example "release 4.1.0").
---

# Release

Input: the version to release (`X.Y.Z`). If the user didn't give one, read `## [Unreleased]` in `CHANGELOG.md`, propose the semver bump it implies (any breaking change means a major), and ask.

Every step that leaves the machine (push, tag, GitHub release, npm approval) needs the user's go-ahead in this session. Ask before each one.

## 1. Check the starting point

- `git status --short` is clean, and the branch is `main`, level with `origin/main`.
- The latest CI run on `main` passed: `gh run list --branch main --limit 1`.
- `## [Unreleased]` lists every change users will notice since the last tag (`git log --oneline $(git describe --tags --abbrev=0)..HEAD`). Propose missing entries to the user. Tooling-only changes don't need one.

Done when the tree is clean, CI is green and the user agrees the changelog is complete.

## 2. Prepare the release commit

- Set `"version": "X.Y.Z"` in both `package.json` and `jsr.json`.
- In `CHANGELOG.md`, rename `## [Unreleased]` to `## [X.Y.Z] - <today, YYYY-MM-DD>` and add an empty `## [Unreleased]` above it.
- At the bottom, point `[unreleased]` at `vX.Y.Z...HEAD` and add `[X.Y.Z]: https://github.com/artberri/diod/compare/v<previous>...vX.Y.Z` below it.
- Run `pnpm run qa` and `pnpm run build`.
- Commit as `chore: release X.Y.Z`, with the `commit` skill.

Done when both files carry `X.Y.Z`, the CHANGELOG heading and links are right, and the commit is made.

## 3. Push and wait for CI

Push `main`, then watch the run for the pushed commit until it finishes (`gh run list --branch main --limit 1`, then `gh run watch <id> --exit-status`). A freshly pushed run can take a few seconds to appear.

Done when CI on the release commit is green.

## 4. Tag and create the GitHub release

Give the user these commands to run (the tag is GPG-signed, which may prompt for the key):

```sh
git tag -s vX.Y.Z -m "Version X.Y.Z" <release commit sha>
git tag -v vX.Y.Z
git push origin vX.Y.Z
gh release create vX.Y.Z --verify-tag --title "Version X.Y.Z" \
  --notes "$(awk '/^## \[X\.Y\.Z\]/{f=1;next} /^## \[/{f=0} f' CHANGELOG.md)"
```

Tag the release commit from step 2. GitHub runs `publish.yml` from the tagged commit, and the release, not the tag push, starts it. A wrong tag that has no release yet is safe to delete: `git push origin --delete vX.Y.Z && git tag -d vX.Y.Z`.

Done when the release exists and `git tag -v` shows a good signature.

## 5. Follow the publish run

Watch the `publish` workflow (`gh run list --workflow publish.yml --limit 1`). It has two jobs:

- `build` stages the version on npm. Its log ends with `staged with id <stage-id>`.
- `jsr` publishes `@artberri/diod@X.Y.Z` immediately.

If a job fails, read its log (`gh run view <id> --log-failed`) and report the cause before changing anything. Don't re-run the JSR job after a partial publish: JSR versions are immutable.

Done when both jobs passed and you have the stage id.

## 6. Approve on npm

Give the user the approval command, which asks for their 2FA:

```sh
npm stage approve <stage-id>
```

They can also approve it on npmjs.com. Then confirm the release is live:

- `npm view diod dist-tags.latest` is `X.Y.Z`.
- `npm view diod@X.Y.Z dist.attestations.provenance` shows a provenance predicate.
- `curl -s https://api.jsr.io/scopes/artberri/packages/diod/versions` lists `X.Y.Z`.

Done when all three checks pass. Report the npm and JSR versions.
