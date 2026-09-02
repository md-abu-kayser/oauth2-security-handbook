# 01 — Common OAuth 2.0 Vulnerabilities

## 1. Why integrations fail

OAuth failures are often integration failures: insufficient validation, unsafe redirects, token leakage, weak transaction binding, issuer confusion, and incorrect artifact handling.

## 2. Authorization code interception

Threat model:

```text
User authorizes
   ↓
code returned
   ↓
attacker intercepts code
   ↓
attempt token redemption
```

PKCE binds the code exchange to a secret verifier held by the initiating transaction.

## 3. Login CSRF

If a client does not correlate the callback with the login transaction, an attacker may be able to cause the victim's browser to accept an authorization response initiated elsewhere. Use unpredictable per-transaction `state` and validate it before proceeding.

## 4. Redirect URI attacks

An authorization code is only useful when delivered to the correct redirect endpoint. Exact registration and exact comparison reduce this attack surface.

## 5. Token leakage

Inspect URLs, fragments, browser storage, analytics, logs, traces, screenshots, and error messages. Token leakage is often a data-flow problem rather than a cryptographic problem.

## 6. Mix-up attacks

When a client interacts with more than one authorization server, it must bind responses to the correct issuer. Provider metadata and issuer validation become part of the security boundary.

## 7. Token substitution

A token can be correctly signed but still be wrong for your audience, issuer, client, resource, or transaction. Validate semantics, not just cryptography.

## 8. Security test matrix

```text
wrong state
missing state
wrong issuer
wrong audience
expired code
reused code
invalid redirect URI
wrong PKCE verifier
tampered token
unknown kid
unexpected algorithm
```

## 9. Review questions

For every protocol value ask:

```text
Who controls it?
Where is it sent?
What proves it is valid?
What happens if it is attacker-controlled?
What is the failure mode?
```

> **Handbook note**
>
> This chapter is written as an engineering reference. Examples are simplified; validate every security decision against the applicable standards and your system threat model.
