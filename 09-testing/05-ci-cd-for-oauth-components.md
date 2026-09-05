# 05 — CI/CD for OAuth Components

OAuth security regressions belong in CI, not only in manual reviews.

## 1. Pipeline

```text
Pull Request
    |
    +--> lint
    +--> typecheck
    +--> unit tests
    +--> integration tests
    +--> dependency audit
    +--> secret scan
    +--> security tests
    |
    v
Build artifact
    |
    v
Deployment
```

## 2. Separate test environments

Use:

```text
unit
integration
staging
production
```

Never point normal CI at production identity credentials.

## 3. Secret handling

CI should inject secrets at runtime:

```text
CI secret store
    |
    v
test process
```

Do not write them into committed files.

## 4. Security gates

Fail CI on:

```text
secret detected
dependency vulnerability policy violation
redirect URI regression
PKCE regression
issuer validation regression
token leakage test
failed security suite
```

## 5. Integration credentials

Prefer dedicated test tenants / applications.

For example:

```text
oauth-ci-google
oauth-ci-github
oauth-ci-keycloak
```

with minimum permissions.

## 6. Reproducibility

Pin:

```text
runtime version
dependency lockfile
container version
provider test configuration
```

Avoid:

```text
latest
unbounded dependency ranges
shared production credentials
```

## 7. Deployment smoke test

After deployment, verify:

```text
login URL
callback
token endpoint
UserInfo
protected API
logout
revocation behavior
```

Do not print tokens while diagnosing failures.

## 8. Example GitHub Actions shape

```yaml
name: OAuth Security CI

on:
  pull_request:
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: npm

      - run: npm ci
      - run: npm run lint
      - run: npm run typecheck
      - run: npm test
      - run: npm run test:integration
      - run: npm audit --audit-level=high
```

Adapt the runtime and audit policy to your project.

## Lab

Make a CI pipeline fail intentionally for:

```text
wrong state
wrong PKCE verifier
wrong issuer
wrong audience
secret in source
```

Then restore the controls and confirm the pipeline passes.
