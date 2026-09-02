# 06 — Client Secret Management

## 1. What is actually secret?

A value embedded into browser-delivered JavaScript is not confidential. For example:

```text
frontend .env
→ build process
→ JavaScript bundle
→ browser
```

Users can inspect the bundle. Treat frontend configuration as public unless the value has no security sensitivity.

## 2. Client classification

| Client                  | Can protect long-term secret? |
| ----------------------- | ----------------------------- |
| Server-side application | Usually yes                   |
| SPA                     | No                            |
| Native app              | Cannot assume yes             |

This classification affects client authentication and flow design.

## 3. Secure storage

Prefer deployment secret stores or managed secret managers. Apply least privilege and audit access.

## 4. Rotation lifecycle

```text
generate → distribute → activate → monitor → rotate → revoke old value
```

Design applications to support rotation without emergency source-code edits.

## 5. CI/CD hygiene

Never print secrets in build logs. Avoid command-line arguments when process inspection could reveal them. Use masked variables and dedicated secret storage.

## 6. Credential methods

Depending on architecture, token endpoints may support mechanisms such as `client_secret_basic`, `private_key_jwt`, or mTLS. Pick a method that matches the actual client type and assurance requirements.

## 7. Incident response

A secret committed to a public or compromised location should be treated as compromised even if the commit is later deleted. Rotate it and investigate usage.

## 8. Exercise

Write a client-credential policy covering classification, storage, access, rotation, logging, ownership, and decommissioning.

> **Handbook note**
>
> This chapter is written as an engineering reference. Examples are simplified; validate every security decision against the applicable standards and your system threat model.
