# 03 — Security Testing and Penetration Testing

OAuth security testing should model realistic abuse rather than only verify normal protocol behavior.

## 1. Authorization flow tests

Attempt:

```text
state substitution
code substitution
code replay
redirect manipulation
PKCE verifier substitution
issuer confusion
audience confusion
```

## 2. Redirect tests

Probe for:

```text
open redirects
wildcards
subdomain confusion
scheme downgrade
URL parser differences
encoded bypasses
```

Do this only against systems you are authorized to test.

## 3. Token tests

Check whether the API rejects:

```text
expired tokens
wrong audience
wrong issuer
wrong signature
unsupported algorithm
malformed JWT
insufficient scope
revoked credentials
```

## 4. Browser security

For redirect-based applications inspect:

```text
CSP
Referrer-Policy
Secure cookies
HttpOnly
SameSite
CORS
frame protection
mixed content
URL leakage
```

## 5. Secrets

Scan:

```text
source
Git history
CI logs
container layers
documentation
screenshots
test fixtures
```

Never use real production tokens in a security test repository.

## 6. Rate limiting

Test abuse against:

```text
authorization endpoint
token endpoint
introspection endpoint
revocation endpoint
login callback
```

A security control can become a denial-of-service vector if an attacker can exhaust downstream dependencies.

## 7. Penetration-testing workflow

```text
Recon
  ->
Threat model
  ->
Attack hypotheses
  ->
Controlled tests
  ->
Evidence
  ->
Impact
  ->
Mitigation
  ->
Regression test
```

## 8. Report format

For each issue:

```text
Title
Severity
Affected component
Precondition
Attack steps
Observed result
Security impact
Root cause
Recommended mitigation
Regression test
```

## Lab

Choose five OAuth vulnerabilities and create a controlled regression test for each.

Do not test third-party production providers without explicit authorization.
