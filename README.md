# OAuth 2.0 Security Handbook

> A practical, security-first guide to OAuth 2.0, OpenID Connect, tokens, modern grant flows, implementation patterns, testing, and provider integrations.

[![OAuth 2.0](https://img.shields.io/badge/OAuth%202.0-security--first-1f6feb?style=flat-square)](https://oauth.net/2/)
[![OpenID Connect](https://img.shields.io/badge/OIDC-identity%20layer-7c3aed?style=flat-square)](https://openid.net/developers/how-connect-works/)
[![Documentation](https://img.shields.io/badge/content-Markdown-083344?style=flat-square)](README.md)
[![License](https://img.shields.io/badge/license-see%20LICENSE-475569?style=flat-square)](LICENSE)

OAuth is easy to describe and surprisingly easy to get wrong. This handbook is designed to make the protocol understandable at the wire level, implementable in real applications, and reviewable from a security engineer's perspective.

It connects the complete path from HTTP and cryptography fundamentals to authorization flows, token validation, OIDC identity, threat modeling, automated testing, and production-oriented integration patterns.

## What this project helps you do

- Build an accurate mental model of OAuth roles, trust boundaries, endpoints, and tokens.
- Select the appropriate flow for browser apps, native apps, service-to-service workloads, and constrained devices.
- Implement Authorization Code with PKCE, Client Credentials, Device Authorization, Refresh Token, Token Exchange, and JWT Bearer flows.
- Understand when OAuth is being used for delegated authorization and when OIDC is required for authentication.
- Validate JWT and opaque tokens, handle key rotation, manage lifetimes, and design revocation strategies.
- Identify redirect URI attacks, CSRF, code injection, token leakage, mix-up attacks, and insecure client-secret handling.
- Translate protocol guidance into code snippets, test cases, provider configurations, and review checklists.

## Who this is for

This repository is useful for:

- Developers implementing OAuth 2.0 or OIDC clients and resource servers.
- Security engineers reviewing authorization and token-handling designs.
- Backend and platform engineers integrating identity providers.
- Students and interview candidates who need more than a flow diagram.
- Teams building an internal reference for secure authentication architecture.

## Learning path

The handbook is intentionally ordered. Start with the foundations, then move from protocol concepts to implementation and security verification.

| Section | Focus                                                                      | Start here                                                     |
| ------- | -------------------------------------------------------------------------- | -------------------------------------------------------------- |
| **00**  | Prerequisites: HTTP, identity, JWTs, cryptography, and protocol comparison | [Prerequisites](00-prerequisites/)                             |
| **01**  | OAuth roles, endpoints, clients, tokens, scopes, redirects, and state      | [Fundamentals](01-fundamentals/)                               |
| **02**  | Authorization and token grant types, including PKCE and device flow        | [Grant types](02-grant-types/)                                 |
| **03**  | Bearer tokens, JWTs, introspection, revocation, expiration, and binding    | [Tokens and token handling](03-tokens-and-token-handling/)     |
| **04**  | OIDC discovery, ID tokens, claims, UserInfo, and flow selection            | [OpenID Connect](04-openid-connect-oidc/)                      |
| **05**  | Common vulnerabilities, secure defaults, and defensive controls            | [Security considerations](05-security-considerations/)         |
| **06**  | Application and infrastructure implementation guidance                     | [Implementation guides](06-implementation-guides/)             |
| **07**  | Advanced protocol topics and architecture patterns                         | [Advanced topics](07-advanced-topics/)                         |
| **08**  | Identity provider and platform integrations                                | [Integrations and providers](08-integrations-and-providers/)   |
| **09**  | Functional, negative, security, and interoperability testing               | [Testing](09-testing/)                                         |
| **10**  | Reusable secure patterns and engineering best practices                    | [Best practices and patterns](10-best-practices-and-patterns/) |
| **11**  | End-to-end scenarios and real-world project exercises                      | [Real-world projects](11-real-world-projects/)                 |
| **12**  | Focused code examples and request/response references                      | [Code snippets](12-code-snippets/)                             |
| **13**  | Cheatsheets, diagrams, standards, and further resources                    | [Resources and cheatsheets](13-resources-cheatsheets/)         |

### Recommended progression

```text
Prerequisites
	-> Fundamentals
	-> Grant types and token handling
	-> OpenID Connect
	-> Security considerations
	-> Implementation guides
	-> Testing and real-world projects
	-> Advanced topics and provider integrations
```

For the strongest learning outcome, complete the practical challenge at the end of each chapter before moving on.

## Security principles

The material consistently favors:

- Authorization Code with PKCE for interactive clients where applicable.
- Exact redirect URI validation and strict `state` handling.
- Short-lived access tokens with carefully designed refresh-token policies.
- TLS for every protocol exchange and secure storage for credentials and tokens.
- Server-side validation of issuer, audience, signature, algorithm, timestamps, and claims.
- Least-privilege scopes and explicit consent boundaries.
- Negative tests for invalid, expired, replayed, malformed, and incorrectly scoped credentials.
- Mature, standards-compliant identity infrastructure instead of hand-rolled Authorization Servers.

Security guidance should always be checked against current standards and the documentation for the provider and libraries used in your system.

## Standards and terminology

The handbook uses OAuth 2.0 terminology while covering the modern security practices associated with the current ecosystem, including:

- OAuth 2.0 Authorization Framework and its bearer-token, introspection, revocation, device authorization, token exchange, and JWT bearer extensions.
- Proof Key for Code Exchange (PKCE).
- OpenID Connect Core and Discovery.
- JSON Web Token (JWT), JSON Web Key (JWK), and JSON Web Signature (JWS) concepts.
- OAuth security best practices and provider-specific implementation guidance.

RFC numbers and links are included in the relevant chapters so readers can move from an explanation to the normative source.

## Repository conventions

Each topic aims to make the following explicit:

```text
Purpose
Architecture
Protocol exchange
Implementation
Failure modes
Security considerations
Testing
References
```

Examples are designed to be read, adapted, and tested. They are not a substitute for threat modeling, security review, or provider documentation.

## Contributing

Contributions are welcome, especially corrections to protocol behavior, clearer threat explanations, provider updates, and additional negative tests. Before opening a change, read [CONTRIBUTING.md](CONTRIBUTING.md).

Please never commit real credentials, access tokens, refresh tokens, private keys, personal data, or production configuration. Report sensitive vulnerabilities through the repository's private security process rather than a public issue.

## Responsible use

This is an educational and engineering reference. Code examples should be evaluated in the context of the target application, deployment model, threat profile, and identity provider. Do not deploy sample code as an Authorization Server without a complete security review and appropriate operational controls.

### License

- This project is licensed under the terms of the **[MIT License](./LICENSE)**.
- You may replace or update the license as needed for client or proprietary projects.

---

### Contact and Maintainer

- **Name:** Md Abu Kayser
- **Project:** _oauth2-security-handbook_
- **Maintainer:** [md-abu-kayser](https://github.com/md-abu-kayser)
- **Email:** [abu.kayser.official@gmail.com](mailto:abu.kayser.official@gmail.com)
- **GitHub:** [github.com/abu.kayser-official](https://github.com/md-abu-kayser)

If you’d like this README tailored for a specific purpose - such as **hiring managers**, **open-source contributors**, or **client deliverables** - feel free to request a custom tone or format.

---
