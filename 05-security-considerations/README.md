# 05 — Security Considerations

This is the defensive core of the handbook. It covers attack classes, redirect handling, browser transaction security, token protection, PKCE, secret management, revocation, and threat modeling.

## Chapter map

| #   | Topic                                     |
| --- | ----------------------------------------- |
| 01  | Common OAuth 2.0 Vulnerabilities          |
| 02  | Redirect URI Validation and Open Redirect |
| 03  | CSRF and the `state` Parameter            |
| 04  | Token Leakage and Storage Best Practices  |
| 05  | PKCE and Why It Matters                   |
| 06  | Client Secret Management                  |
| 07  | Using HTTPS Everywhere                    |
| 08  | Token Revocation and Blacklisting         |
| 09  | Threat Modeling for OAuth Applications    |

## Primary security references

- RFC 9700 — OAuth 2.0 Security Best Current Practice
- RFC 7636 — Proof Key for Code Exchange
- RFC 7009 — OAuth 2.0 Token Revocation
- RFC 7662 — OAuth 2.0 Token Introspection
- RFC 8252 — OAuth 2.0 for Native Apps
- RFC 8705 — OAuth 2.0 Mutual-TLS Client Authentication and Certificate-Bound Access Tokens
- RFC 9449 — OAuth 2.0 Demonstrating Proof of Possession at the Application Layer (DPoP)

> **Handbook note**
>
> This chapter is written as an engineering reference. Examples are simplified; validate every security decision against the applicable standards and your system threat model.
