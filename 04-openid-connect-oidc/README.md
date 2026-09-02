# 04 — OpenID Connect (OIDC)

OIDC is the identity layer built on OAuth 2.0. This section covers identity assertions, ID Tokens, flows, discovery, registration, UserInfo, and the OAuth/OIDC boundary.

## Chapter map

| #   | Topic                                     | Outcome                                             |
| --- | ----------------------------------------- | --------------------------------------------------- |
| 01  | What Is OpenID Connect?                   | Understand OIDC architecture and identity semantics |
| 02  | ID Tokens and Claims                      | Validate identity assertions correctly              |
| 03  | OIDC Flows                                | Choose and secure a modern flow                     |
| 04  | Discovery and Dynamic Client Registration | Automate provider metadata and onboarding           |
| 05  | UserInfo Endpoint                         | Safely consume protected identity claims            |
| 06  | OIDC vs OAuth 2.0                         | Keep authentication and authorization distinct      |

## Core standards

- OpenID Connect Core 1.0 — https://openid.net/specs/openid-connect-core-1_0.html
- OpenID Connect Discovery 1.0 — https://openid.net/specs/openid-connect-discovery-1_0.html
- OpenID Connect Dynamic Client Registration 1.0 — https://openid.net/specs/openid-connect-registration-1_0.html
- RFC 8414 — OAuth 2.0 Authorization Server Metadata
- RFC 9700 — OAuth 2.0 Security Best Current Practice

> **Handbook note**
>
> This chapter is written as an engineering reference. Examples are simplified; validate every security decision against the applicable standards and your system threat model.
