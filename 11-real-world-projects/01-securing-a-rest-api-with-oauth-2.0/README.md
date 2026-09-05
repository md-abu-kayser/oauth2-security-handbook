# Project 01 — Securing a REST API with OAuth 2.0

## Outcome

Build a small but production-minded Authorization Server + Resource Server + OAuth Client system.

## Architecture

```text
Client
  |
  +---- Authorization Request ----> Authorization Server
  |                                  |
  |<--------- Code / Tokens ---------+
  |
  +----------- Access Token -------> Resource Server
                                     |
                                     v
                                  Database
```

## Suggested stack

```text
Node.js + Express + TypeScript
PostgreSQL + Prisma
Jest/Vitest
Docker
```

## Acceptance criteria

- Authorization Code is single-use and expires.
- Redirect URIs are registered and validated.
- PKCE is enforced where required by the client profile.
- APIs validate issuer, audience, signature and lifetime.
- Scopes are enforced separately from resource ownership.
- Tokens and secrets never appear in logs.
- Automated negative tests cover replay and substitution attacks.
