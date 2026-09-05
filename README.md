# OAuth 2.0 Security Handbook

<p align="center">
  <strong>A practical, security-first reference for OAuth 2.0, OpenID Connect, tokens, modern authorization flows, implementation patterns, threat modeling, testing, and identity-provider integrations.</strong>
</p>

<p align="center">
  <a href="https://oauth.net/2/">
    <img src="https://img.shields.io/badge/OAuth%202.0-Security%20First-1f6feb?style=for-the-badge&logo=auth0&logoColor=white" alt="OAuth 2.0 Security First" />
  </a>
  <a href="https://openid.net/connect/">
    <img src="https://img.shields.io/badge/OpenID%20Connect-Identity%20Layer-7c3aed?style=for-the-badge&logo=openid&logoColor=white" alt="OpenID Connect" />
  </a>
  <a href="https://www.rfc-editor.org/rfc/rfc9700.html">
    <img src="https://img.shields.io/badge/IETF-RFC%209700-0b7285?style=for-the-badge&logo=ietf&logoColor=white" alt="IETF RFC 9700" />
  </a>
  <a href="https://github.com/md-abu-kayser/oauth2-security-handbook">
    <img src="https://img.shields.io/badge/Content-Markdown-334155?style=for-the-badge&logo=markdown&logoColor=white" alt="Markdown Documentation" />
  </a>
</p>

<p align="center">
  <a href="https://github.com/md-abu-kayser/oauth2-security-handbook/blob/main/LICENSE">
    <img src="https://img.shields.io/badge/License-MIT-475569?style=flat-square" alt="MIT License" />
  </a>
  <a href="https://github.com/md-abu-kayser/oauth2-security-handbook">
    <img src="https://img.shields.io/github/repo-size/md-abu-kayser/oauth2-security-handbook?style=flat-square" alt="Repository Size" />
  </a>
  <a href="https://github.com/md-abu-kayser/oauth2-security-handbook/commits/main">
    <img src="https://img.shields.io/github/last-commit/md-abu-kayser/oauth2-security-handbook?style=flat-square" alt="Last Commit" />
  </a>
</p>

---

## Overview

OAuth 2.0 is widely used for delegated authorization and API access, but implementing it securely requires substantially more than understanding a basic authorization-code diagram.

This repository is a **security-first, implementation-oriented handbook** for understanding OAuth 2.0 and OpenID Connect from first principles through production-oriented architecture.

It connects:

- HTTP and protocol fundamentals
- OAuth 2.0 actors and trust boundaries
- Authorization endpoints and token endpoints
- Authorization Code + PKCE
- Client Credentials
- Device Authorization
- Refresh Tokens
- Token Exchange
- JWT Bearer assertions
- Access-token validation
- Opaque-token introspection
- Token revocation
- OpenID Connect authentication
- Discovery and provider metadata
- JWT, JWK, JWS, and key rotation
- Redirect URI security
- CSRF and `state`
- PKCE and authorization-code injection
- Mix-up attacks
- Token leakage and replay
- Sender-constrained tokens
- DPoP and mTLS concepts
- Threat modeling
- Negative and security testing
- Provider integration patterns
- End-to-end implementation exercises

The goal is not simply to explain how OAuth works.

The goal is to make OAuth **understandable, implementable, testable, and reviewable from a security-engineering perspective**.

---

## Why This Repository Exists

OAuth is easy to describe and surprisingly easy to implement incorrectly.

A flow can appear to work while still containing weaknesses around:

- redirect URI handling
- authorization-code injection
- CSRF
- client authentication
- token storage
- token audience validation
- issuer validation
- algorithm handling
- refresh-token rotation
- replay prevention
- scope enforcement
- provider metadata
- key rotation
- browser security
- native-app redirects
- authorization-server mix-up
- open redirectors
- token leakage

This handbook focuses on the gap between:

> **"The login flow works."**

and

> **"The authorization architecture has been deliberately designed, implemented, tested, and reviewed against current security guidance."**

---

# What You Will Learn

## 1. Build the OAuth mental model

Understand the relationships between:

- Resource Owner
- Client
- Authorization Server
- Resource Server
- User-Agent
- Access Tokens
- Refresh Tokens
- Authorization Codes
- Scopes
- Claims
- Redirect URIs
- Trust boundaries

The objective is to understand **who trusts whom, what crosses each boundary, and why each protocol step exists**.

---

## 2. Understand OAuth at the HTTP level

Instead of relying only on flow diagrams, the handbook studies actual protocol exchanges.

Example:

```http
GET /authorize?
    response_type=code&
    client_id=web-client&
    redirect_uri=https%3A%2F%2Fexample.com%2Fcallback&
    scope=openid%20profile&
    state=abc123&
    code_challenge=xyz456&
    code_challenge_method=S256
```

Followed by:

```http
HTTP/1.1 302 Found
Location: https://example.com/callback?code=AUTH_CODE&state=abc123
```

And then:

```http
POST /token
Content-Type: application/x-www-form-urlencoded

grant_type=authorization_code&
code=AUTH_CODE&
redirect_uri=https%3A%2F%2Fexample.com%2Fcallback&
client_id=web-client&
code_verifier=ORIGINAL_PKCE_VERIFIER
```

The handbook explains:

- why each parameter exists
- which values must be validated
- which component validates them
- what can go wrong
- what an attacker could attempt
- what the defensive control should be

---

# Core Security Philosophy

This repository follows a security-first approach built around current OAuth security guidance.

### Prefer secure modern flows

For interactive authorization, the handbook emphasizes the Authorization Code flow with PKCE where applicable rather than treating legacy browser-oriented patterns as the default.

### Validate exact redirect URIs

Redirect URIs should be tightly controlled and validated according to the applicable OAuth security requirements.

### Treat `state` as a security control

The `state` parameter is covered as a CSRF and request-correlation mechanism rather than merely an optional parameter included because examples commonly contain it.

### Protect authorization codes

Authorization codes must be bound to the legitimate client/request context and protected against injection, interception, replay, and misuse.

### Minimize token exposure

Access tokens, refresh tokens, authorization codes, and credentials should never be exposed unnecessarily through URLs, logs, source control, client-side storage, or insecure application state.

### Validate tokens correctly

Structured tokens must not be treated as trustworthy simply because they decode successfully.

Validation can include:

- issuer
- audience
- signature
- algorithm
- expiration
- not-before
- issued-at
- token type
- scopes
- claims
- key provenance
- sender constraints

### Use least privilege

Scopes should be intentionally designed instead of granting unnecessarily broad API access.

### Test failure paths

A security-oriented implementation must test:

- expired tokens
- malformed tokens
- invalid signatures
- incorrect audiences
- incorrect issuers
- wrong scopes
- invalid authorization codes
- reused authorization codes
- invalid redirect URIs
- failed PKCE verification
- invalid client authentication
- revoked credentials
- replay attempts
- malformed JWTs
- unsupported algorithms

---

# Learning Path

The repository is deliberately organized as a progression from fundamentals to implementation, security verification, and advanced architecture.

| Section | Focus                                                                          |
| ------- | ------------------------------------------------------------------------------ |
| **00**  | Prerequisites: HTTP, identity, JWTs, cryptography, and protocol comparison     |
| **01**  | OAuth roles, endpoints, clients, tokens, scopes, redirects, and `state`        |
| **02**  | Authorization and token grant types, including PKCE and device authorization   |
| **03**  | Bearer tokens, JWTs, introspection, revocation, expiration, and token binding  |
| **04**  | OpenID Connect, discovery, ID Tokens, claims, UserInfo, and authentication     |
| **05**  | Common vulnerabilities, threat models, secure defaults, and defensive controls |
| **06**  | Application and infrastructure implementation guidance                         |
| **07**  | Advanced OAuth protocol topics and architecture patterns                       |
| **08**  | Identity-provider and platform integrations                                    |
| **09**  | Functional, negative, security, and interoperability testing                   |
| **10**  | Reusable secure patterns and engineering best practices                        |
| **11**  | End-to-end scenarios and real-world project exercises                          |
| **12**  | Focused code examples and HTTP request/response references                     |
| **13**  | Cheatsheets, diagrams, standards, and further resources                        |

---

## Repository Structure

```text
oauth2-security-handbook/
│
├── 00-prerequisites/
│   ├── http-fundamentals/
│   ├── identity-authentication-authorization/
│   ├── cryptography-basics/
│   ├── jwt-fundamentals/
│   └── oauth-vs-oidc-vs-saml/
│
├── 01-fundamentals/
│   ├── actors-and-roles/
│   ├── endpoints/
│   ├── clients/
│   ├── scopes/
│   ├── redirect-uris/
│   └── state-and-correlation/
│
├── 02-grant-types/
│   ├── authorization-code/
│   ├── authorization-code-pkce/
│   ├── client-credentials/
│   ├── device-authorization/
│   ├── refresh-token/
│   ├── token-exchange/
│   └── jwt-bearer/
│
├── 03-tokens-and-token-handling/
│   ├── access-tokens/
│   ├── refresh-tokens/
│   ├── jwt-validation/
│   ├── opaque-tokens/
│   ├── introspection/
│   ├── revocation/
│   ├── expiration/
│   ├── rotation/
│   └── sender-constrained-tokens/
│
├── 04-openid-connect-oidc/
│   ├── oidc-overview/
│   ├── discovery/
│   ├── authorization/
│   ├── id-tokens/
│   ├── claims/
│   ├── userinfo/
│   └── logout/
│
├── 05-security-considerations/
│   ├── csrf/
│   ├── authorization-code-injection/
│   ├── redirect-uri-attacks/
│   ├── mix-up-attacks/
│   ├── token-leakage/
│   ├── replay-attacks/
│   ├── open-redirectors/
│   ├── client-secret-exposure/
│   └── insecure-token-storage/
│
├── 06-implementation-guides/
│   ├── browser-applications/
│   ├── backend-applications/
│   ├── native-applications/
│   ├── resource-servers/
│   └── service-to-service/
│
├── 07-advanced-topics/
│   ├── dpop/
│   ├── mtls/
│   ├── token-exchange/
│   ├── authorization-server-metadata/
│   ├── key-rotation/
│   └── multi-tenant-identity/
│
├── 08-integrations-and-providers/
│   ├── github/
│   ├── google/
│   ├── microsoft/
│   ├── auth0/
│   ├── keycloak/
│   └── other-providers/
│
├── 09-testing/
│   ├── functional/
│   ├── negative/
│   ├── security/
│   ├── interoperability/
│   └── test-fixtures/
│
├── 10-best-practices-and-patterns/
│   ├── secure-client/
│   ├── secure-resource-server/
│   ├── secure-token-validation/
│   └── production-checklists/
│
├── 11-real-world-projects/
│   ├── oauth-client/
│   ├── resource-server/
│   ├── oidc-application/
│   └── service-to-service/
│
├── 12-code-snippets/
│   ├── nodejs-express-oauth-server-example/
│   ├── python-flask-oauth-client/
│   ├── java-spring-oauth-resource-server/
│   └── postman/
│
├── 13-resources-cheatsheets/
│   ├── oauth-cheatsheet/
│   ├── oidc-cheatsheet/
│   ├── jwt-cheatsheet/
│   ├── security-checklist/
│   └── references/
│
├── .github/
│   ├── workflows/
│   ├── ISSUE_TEMPLATE/
│   └── pull_request_template.md
│
├── CONTRIBUTING.md
├── LICENSE
└── README.md
```

---

# Grant Types and Modern Flows

The handbook covers the major OAuth flows and extensions that are relevant to modern deployments.

## Authorization Code

The primary interactive authorization flow discussed throughout this repository.

```text
User
 │
 ▼
Client
 │
 │ Authorization Request
 ▼
Authorization Server
 │
 │ User Authentication / Consent
 ▼
Authorization Server
 │
 │ Authorization Code
 ▼
Client
 │
 │ Token Request
 ▼
Authorization Server
 │
 │ Access Token
 ▼
Client
 │
 │ API Request
 ▼
Resource Server
```

---

## Authorization Code + PKCE

PKCE is treated as a core security mechanism for public clients and an important defense against authorization-code interception and injection.

Reference:

- [RFC 7636 — Proof Key for Code Exchange](https://www.rfc-editor.org/rfc/rfc7636.html)

The native-app OAuth guidance also explicitly requires public native clients to implement PKCE. [RFC 8252](https://www.rfc-editor.org/rfc/rfc8252.html) provides the corresponding native-app security guidance.

---

## Client Credentials

Designed for machine-to-machine authorization where the client acts on its own behalf rather than on behalf of an end user.

Typical use cases include:

```text
Service A
   │
   │ Client Credentials
   ▼
Authorization Server
   │
   │ Access Token
   ▼
Service A
   │
   │ API Request
   ▼
Service B
```

Topics include:

- confidential clients
- client authentication
- scopes
- token lifetime
- credential storage
- service identity
- workload authorization

---

## Device Authorization

Designed for devices with limited input capabilities or limited browser functionality.

Examples include:

- smart TVs
- media devices
- consoles
- embedded devices
- printers

Reference:

- [RFC 8628 — OAuth 2.0 Device Authorization Grant](https://www.rfc-editor.org/rfc/rfc8628.html)

---

## Refresh Tokens

Coverage includes:

- token lifetime design
- refresh-token rotation
- revocation
- reuse detection
- storage
- replay considerations
- scope limitations
- sender constraints

Refresh-token security is treated as an architecture concern, not simply an implementation detail.

---

## Token Exchange

Token Exchange is covered for architectures involving delegated or exchanged security tokens.

Reference:

- [RFC 8693 — OAuth 2.0 Token Exchange](https://www.rfc-editor.org/rfc/rfc8693.html)

---

## JWT Bearer

JWT Bearer assertions are covered for OAuth client authentication and authorization-grant scenarios.

Reference:

- [RFC 7523 — JSON Web Token Profile for OAuth 2.0 Client Authentication and Authorization Grants](https://www.rfc-editor.org/rfc/rfc7523.html)

---

# Tokens

Tokens are treated as security credentials rather than ordinary application data.

The handbook covers both:

### Structured tokens

For example:

```text
JWT
 ├── Header
 ├── Payload
 └── Signature
```

### Opaque tokens

For example:

```text
mF_9.B5f-4.1JqM
```

The client or resource server should not assume that an opaque string contains locally understandable claims.

---

## JWT Validation

Decoding is not validation.

A secure validation process can involve:

```text
Receive token
     │
     ▼
Parse structure
     │
     ▼
Identify issuer / key source
     │
     ▼
Resolve signing key
     │
     ▼
Validate algorithm
     │
     ▼
Validate signature
     │
     ▼
Validate issuer
     │
     ▼
Validate audience
     │
     ▼
Validate timestamps
     │
     ▼
Validate scopes / claims
     │
     ▼
Authorize request
```

The implementation guidance emphasizes validating the claims required by the application's actual trust model instead of relying on successful JWT decoding.

---

# Introspection and Revocation

## Token Introspection

OAuth token introspection provides a mechanism for a protected resource to query an authorization server about a token's active status and associated metadata.

Reference:

- [RFC 7662 — OAuth 2.0 Token Introspection](https://www.rfc-editor.org/rfc/rfc7662.html)

---

## Token Revocation

OAuth token revocation provides a mechanism for clients to notify the authorization server that previously issued credentials are no longer needed.

Reference:

- [RFC 7009 — OAuth 2.0 Token Revocation](https://www.rfc-editor.org/rfc/rfc7009.html)

---

# OpenID Connect

OAuth and OpenID Connect are intentionally treated as related but distinct protocols.

```text
OAuth 2.0
    │
    └── Delegated Authorization

OpenID Connect
    │
    └── Authentication / Identity Layer
```

OIDC topics include:

- Authorization Code flow
- ID Tokens
- claims
- nonce
- UserInfo
- discovery
- issuer identifiers
- client configuration
- logout
- authentication versus authorization
- token validation

Official resources:

- [OpenID Connect](https://openid.net/connect/)
- [OpenID Connect Core 1.0](https://openid.net/specs/openid-connect-core-1_0.html)
- [OpenID Connect Discovery 1.0](https://openid.net/specs/openid-connect-discovery-1_0.html)

---

# Discovery and Authorization Server Metadata

Modern integrations benefit from standardized provider metadata rather than hard-coding every endpoint.

OAuth Authorization Server Metadata is defined by:

- [RFC 8414 — OAuth 2.0 Authorization Server Metadata](https://www.rfc-editor.org/rfc/rfc8414.html)

Metadata can describe information such as:

```json
{
  "issuer": "https://authorization.example.com",
  "authorization_endpoint": "https://authorization.example.com/authorize",
  "token_endpoint": "https://authorization.example.com/token",
  "jwks_uri": "https://authorization.example.com/.well-known/jwks.json",
  "scopes_supported": ["openid", "profile", "email"]
}
```

The handbook explains how discovery can reduce configuration mistakes and support interoperable provider integrations.

---

# Security Threats Covered

Security chapters focus on practical vulnerabilities and their mitigations.

| Threat                       | Defensive focus                                             |
| ---------------------------- | ----------------------------------------------------------- |
| Authorization Code Injection | PKCE, request binding, validation                           |
| Redirect URI Attack          | Exact redirect URI validation                               |
| CSRF                         | `state`, secure session correlation                         |
| Authorization Server Mix-Up  | Issuer identification and metadata                          |
| Token Leakage                | Exposure minimization and secure storage                    |
| Token Replay                 | Sender constraints, expiration, rotation                    |
| Open Redirectors             | Strict redirect handling                                    |
| Client Secret Leakage        | Secret management and confidential-client design            |
| Weak JWT Validation          | Signature, issuer, audience, algorithm and claim validation |
| Excessive Scopes             | Least-privilege authorization                               |
| Refresh Token Abuse          | Rotation, reuse detection and revocation                    |
| Browser Exposure             | Secure application architecture and storage choices         |

The current OAuth Security Best Current Practice is **RFC 9700 / BCP 240**, which updates earlier OAuth threat and security guidance and deprecates modes considered insecure or less secure.

---

# Sender-Constrained Tokens

Bearer tokens can potentially be reused by whoever obtains them.

The handbook therefore includes sender-constrained token approaches.

## DPoP

OAuth 2.0 Demonstrating Proof of Possession enables application-level proof-of-possession for OAuth tokens and is designed to help detect replay attacks.

Reference:

- [RFC 9449 — OAuth 2.0 Demonstrating Proof of Possession](https://www.rfc-editor.org/rfc/rfc9449.html)

---

## Mutual TLS

The repository also introduces mutual TLS-based sender-constrained OAuth deployments and discusses when stronger client authentication and token binding mechanisms may be appropriate.

---

# Security Testing

A secure OAuth implementation should not be tested only with successful requests.

The testing section therefore uses a layered strategy.

## Functional Tests

```text
Valid authorization request
Valid callback
Valid code exchange
Valid access token
Valid refresh
Valid API request
```

## Negative Tests

```text
Invalid client_id
Invalid redirect_uri
Invalid state
Invalid code
Expired code
Invalid code_verifier
Expired access token
Malformed JWT
Invalid signature
Invalid issuer
Invalid audience
Insufficient scope
Revoked token
```

## Security Tests

```text
Authorization code injection
Authorization code replay
Token replay
Redirect URI manipulation
Open redirector behavior
CSRF attempts
Mix-up scenarios
Credential leakage
Algorithm confusion attempts
Invalid key selection
Cross-client token misuse
```

The repository intentionally treats negative testing as part of protocol correctness rather than as optional hardening.

---

# Implementation Examples

Code examples are intended to bridge the gap between protocol specifications and application code.

Examples may include:

### Node.js / Express

```text
Authorization Client
Resource Server
JWT validation
OAuth callback handling
PKCE
Token refresh
```

### Python / Flask

```text
OAuth Client
Authorization Code flow
Token exchange
Protected API calls
```

### Java / Spring

```text
OAuth Resource Server
JWT validation
Scope enforcement
Security configuration
```

### Postman

```text
Authorization requests
Token requests
Protected resource requests
Negative test cases
```

Code examples are deliberately educational and should be adapted to the threat model and operational requirements of the target environment.

---

# Provider Integrations

The integration section demonstrates how standards-based OAuth/OIDC concepts map to real-world identity providers.

Possible integrations include:

- GitHub
- Google
- Microsoft identity platforms
- Auth0
- Keycloak
- other standards-compliant OAuth/OIDC providers

Each integration should document:

```text
Provider Metadata
     ↓
Client Registration
     ↓
Redirect URI
     ↓
Authorization Request
     ↓
Callback
     ↓
Token Exchange
     ↓
Token Validation
     ↓
Protected Resource
```

Provider-specific behavior is intentionally separated from protocol fundamentals.

---

# Standards and Official References

This repository prioritizes normative and first-party documentation.

| Standard / Specification | Purpose                         | Official reference                                                               |
| ------------------------ | ------------------------------- | -------------------------------------------------------------------------------- |
| OAuth 2.0                | Authorization framework         | [RFC 6749](https://www.rfc-editor.org/rfc/rfc6749.html)                          |
| Bearer Token             | HTTP bearer-token usage         | [RFC 6750](https://www.rfc-editor.org/rfc/rfc6750.html)                          |
| PKCE                     | Proof Key for Code Exchange     | [RFC 7636](https://www.rfc-editor.org/rfc/rfc7636.html)                          |
| Native Apps              | OAuth native-app security       | [RFC 8252](https://www.rfc-editor.org/rfc/rfc8252.html)                          |
| Device Authorization     | Device authorization flow       | [RFC 8628](https://www.rfc-editor.org/rfc/rfc8628.html)                          |
| Token Exchange           | Security-token exchange         | [RFC 8693](https://www.rfc-editor.org/rfc/rfc8693.html)                          |
| JWT Bearer               | JWT assertions for OAuth        | [RFC 7523](https://www.rfc-editor.org/rfc/rfc7523.html)                          |
| Introspection            | Token status and metadata       | [RFC 7662](https://www.rfc-editor.org/rfc/rfc7662.html)                          |
| Revocation               | Token revocation                | [RFC 7009](https://www.rfc-editor.org/rfc/rfc7009.html)                          |
| AS Metadata              | Authorization server metadata   | [RFC 8414](https://www.rfc-editor.org/rfc/rfc8414.html)                          |
| DPoP                     | Proof-of-possession tokens      | [RFC 9449](https://www.rfc-editor.org/rfc/rfc9449.html)                          |
| OAuth Security BCP       | Current OAuth security guidance | [RFC 9700](https://www.rfc-editor.org/rfc/rfc9700.html)                          |
| OpenID Connect           | Authentication identity layer   | [OpenID Foundation](https://openid.net/connect/)                                 |
| OIDC Core                | Core OIDC protocol              | [OIDC Core 1.0](https://openid.net/specs/openid-connect-core-1_0.html)           |
| OIDC Discovery           | Provider discovery              | [OIDC Discovery 1.0](https://openid.net/specs/openid-connect-discovery-1_0.html) |

---

# Recommended Progression

```text
┌───────────────────────┐
│ 00. Prerequisites     │
└──────────┬────────────┘
           │
           ▼
┌───────────────────────┐
│ 01. Fundamentals      │
└──────────┬────────────┘
           │
           ▼
┌───────────────────────┐
│ 02. Grant Types        │
└──────────┬────────────┘
           │
           ▼
┌───────────────────────┐
│ 03. Token Handling    │
└──────────┬────────────┘
           │
           ▼
┌───────────────────────┐
│ 04. OpenID Connect    │
└──────────┬────────────┘
           │
           ▼
┌───────────────────────┐
│ 05. Security          │
└──────────┬────────────┘
           │
           ▼
┌───────────────────────┐
│ 06. Implementation    │
└──────────┬────────────┘
           │
           ▼
┌───────────────────────┐
│ 09. Testing           │
└──────────┬────────────┘
           │
           ▼
┌───────────────────────┐
│ 11. Real-World        │
│     Projects          │
└──────────┬────────────┘
           │
           ▼
┌───────────────────────┐
│ 07/08. Advanced +     │
│        Integrations   │
└───────────────────────┘
```

For the strongest learning outcome, each major chapter should end with a practical exercise, security challenge, or implementation task.

---

# Repository Conventions

Each topic follows a consistent documentation model whenever practical:

```text
Purpose
    ↓
Architecture
    ↓
Actors and Trust Boundaries
    ↓
Protocol Exchange
    ↓
HTTP Examples
    ↓
Implementation
    ↓
Security Considerations
    ↓
Attack Scenarios
    ↓
Testing
    ↓
Failure Modes
    ↓
References
```

This structure is designed to make individual topics useful both for learning and for later engineering reference.

---

# Engineering Principles

The repository consistently promotes:

- Standards-first implementation
- Least privilege
- Explicit trust boundaries
- Secure defaults
- Minimal token exposure
- Strong client authentication where appropriate
- PKCE for applicable authorization-code clients
- Exact redirect URI handling
- Strict issuer and audience validation
- Secure cryptographic key management
- Short-lived access tokens where appropriate
- Carefully designed refresh-token policies
- Defense in depth
- Negative testing
- Interoperability testing
- Threat modeling
- Provider documentation as a source of deployment-specific truth

---

# What This Repository Is Not

This project is **not** intended to replace:

- formal security reviews
- threat modeling
- provider documentation
- standards specifications
- production incident response procedures
- legal or compliance guidance

Protocol examples should never be copied into production without understanding the deployment architecture, client type, security requirements, and identity provider behavior.

---

# Secure Development Checklist

Before considering an OAuth/OIDC implementation production-ready, review at least:

```text
[ ] Authorization server is explicitly identified
[ ] Resource server trust boundaries are documented
[ ] Client type is correctly classified
[ ] Redirect URIs are strictly validated
[ ] PKCE is correctly implemented where applicable
[ ] state is validated correctly
[ ] nonce is used where required by OIDC
[ ] Client authentication is appropriately designed
[ ] Client secrets are never exposed to public clients
[ ] Tokens are protected from unnecessary exposure
[ ] Access-token audience is validated
[ ] Token issuer is validated
[ ] JWT signatures are validated
[ ] Accepted algorithms are explicitly controlled
[ ] Token timestamps are validated
[ ] Scopes are enforced
[ ] Refresh-token behavior is documented
[ ] Revocation strategy is documented
[ ] Key rotation is supported
[ ] JWKS handling is understood
[ ] Negative tests exist
[ ] Replay scenarios are tested
[ ] Redirect manipulation is tested
[ ] Authorization-code replay is tested
[ ] Provider metadata is validated
[ ] TLS is enforced
[ ] Logging does not leak credentials or tokens
[ ] Production secrets are managed securely
```

---

# Contributing

Contributions are welcome, especially:

- protocol corrections
- security improvements
- clearer explanations
- improved diagrams
- additional negative tests
- interoperability test cases
- provider updates
- implementation examples
- documentation improvements

Before contributing, please read:

[CONTRIBUTING.md](CONTRIBUTING.md)

### Security Issues

Please do **not** publicly disclose sensitive vulnerabilities through ordinary GitHub issues.

Never commit:

```text
Client secrets
Access tokens
Refresh tokens
Private keys
Passwords
API keys
Production credentials
Personal data
Internal configuration
```

Use the repository's private security-reporting mechanism for genuine vulnerabilities.

---

# Responsible Use

This repository is an educational and engineering reference.

OAuth/OIDC implementation decisions should always be evaluated in the context of:

```text
Application Architecture
        +
Client Type
        +
Threat Model
        +
Identity Provider
        +
Token Model
        +
Deployment Environment
        +
Operational Controls
```

Sample implementations should not automatically be treated as production-ready Authorization Servers or identity infrastructure.

---

# License

This project is licensed under the **MIT License**.

See the [LICENSE](LICENSE) file for the complete license text.

---

# Maintainer

<p align="center">
  <strong>Md Abu Kayser</strong>
</p>

<p align="center">
  OAuth 2.0 • OpenID Connect • Application Security • Backend Engineering
</p>

<p align="center">
  <a href="https://github.com/md-abu-kayser">
    GitHub
  </a>
  &nbsp;•&nbsp;
  <a href="mailto:abu.kayser.official@gmail.com">
    Email
  </a>
</p>

---

# Project Information

| Property      | Value                               |
| ------------- | ----------------------------------- |
| Project       | `oauth2-security-handbook`          |
| Documentation | OAuth 2.0 & OpenID Connect          |
| Focus         | Security-first protocol engineering |
| Format        | Markdown + Code Examples            |
| License       | MIT                                 |
| Maintainer    | Md Abu Kayser                       |

---

<p align="center">
  <strong>Learn the protocol. Understand the threat model. Implement the controls. Test the failures.</strong>
</p>

<p align="center">
  <sub>Built as a practical reference for developers, security engineers, backend engineers, students, and teams working with OAuth 2.0 and OpenID Connect.</sub>
</p>
