# 01 — Unit Testing OAuth Flows

Unit tests should isolate deterministic security rules from external providers.

## 1. What to unit test

Test functions such as:

```text
buildAuthorizationUrl()
generateState()
validateState()
generatePKCE()
validateIDTokenClaims()
validateRedirectUri()
mapProviderProfile()
normalizeScopes()
shouldRefreshToken()
```

## 2. State tests

```text
fresh state        -> valid
same state         -> valid once
wrong state        -> reject
missing state      -> reject
expired state      -> reject
replayed state     -> reject
```

## 3. PKCE tests

Verify:

```text
verifier -> challenge
same verifier -> accepted
wrong verifier -> rejected
malformed verifier -> rejected
```

Use fixed test vectors for deterministic hashing tests.

## 4. Redirect URI tests

Include:

```text
exact match
scheme change
host confusion
port difference
path difference
trailing slash
userinfo component
encoded characters
```

Your expected behavior should match the provider/security specification rather than personal intuition.

## 5. ID Token claim tests

Test:

```text
iss
sub
aud
azp where applicable
exp
iat
nonce
signature algorithm
key id
```

Do not test only a “happy” JWT.

## 6. Example Jest-style test

```js
describe("validateState", () => {
  it("accepts the expected transaction state", () => {
    expect(validateState("abc", "abc")).toBe(true);
  });

  it("rejects a mismatched state", () => {
    expect(validateState("abc", "attacker")).toBe(false);
  });
});
```

## 7. Negative-first mindset

For security code, ask:

```text
What happens if input is missing?
What if it is duplicated?
What if it expires?
What if it is replayed?
What if its issuer is wrong?
What if an attacker controls it?
```

## 8. Coverage is not enough

100% line coverage does not prove OAuth security.

A strong test suite covers:

```text
state transitions
trust boundaries
authorization decisions
token semantics
failure paths
replay behavior
```

## Lab

Create a test matrix for your OAuth callback and mark every branch as:

```text
covered
not covered
not applicable
```
