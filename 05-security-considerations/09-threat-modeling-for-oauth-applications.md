# 09 — Threat Modeling for OAuth Applications

## 1. Start with assets and trust boundaries

Before choosing a library, identify:

```text
assets
actors
attacker capabilities
trust boundaries
data flows
security invariants
```

## 2. Common assets

- authorization codes
- access tokens
- refresh tokens
- ID Tokens
- client credentials
- signing keys
- session cookies
- identity attributes
- redirect registrations

## 3. Actors

Consider legitimate users, malicious users, XSS attackers, compromised dependencies, attackers controlling a redirect destination, stolen devices, compromised CI/CD systems, and malicious insiders.

## 4. Attack tree

```text
Goal: unauthorized API access
├── Steal access token
│   ├── URL/log leakage
│   ├── browser storage compromise
│   └── compromised endpoint
├── Steal authorization code
│   ├── redirect weakness
│   └── interception
└── Trick client into accepting wrong identity
    ├── state failure
    ├── issuer mix-up
    ├── audience failure
    └── nonce failure
```

## 5. Security requirements from threats

| Threat                  | Example mitigation                 |
| ----------------------- | ---------------------------------- |
| Code interception       | PKCE                               |
| Login CSRF              | State validation                   |
| OIDC replay/correlation | Nonce validation                   |
| Token substitution      | Issuer/audience validation         |
| Redirect theft          | Exact redirect URI validation      |
| Token leakage           | Secure handling + limited lifetime |
| Rogue issuer            | Trusted issuer/metadata policy     |
| Key compromise          | Rotation + monitoring              |

## 6. Trust-boundary worksheet

For each flow, document:

```text
Source → Destination
Data → Transport
Authentication → Integrity → Confidentiality
Authorization → Failure behavior → Logging
```

## 7. Residual risk

Record:

```text
risk → likelihood → impact → mitigation → residual risk → owner
```

This turns “security best practices” into a reviewable engineering artifact.

## 8. Capstone

Create a threat model for:

```text
SPA → Node.js BFF → OIDC provider
                 ↘ API gateway → 3 microservices
                 ↘ PostgreSQL
```

Deliver a data-flow diagram, assets list, trust boundaries, threat register, mitigations, negative tests, and incident-response notes.

> **Handbook note**
>
> This chapter is written as an engineering reference. Examples are simplified; validate every security decision against the applicable standards and your system threat model.
