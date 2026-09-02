# 06 — Implementation Guides

This section turns protocol knowledge into engineering practice. The goal is to understand not only
how OAuth/OIDC works, but where each component belongs, what it must validate, how data moves between
trust boundaries, and how a deployment is hardened.

## Chapter map

| #   | Guide                            | Main engineering outcome                                                           |
| --- | -------------------------------- | ---------------------------------------------------------------------------------- |
| 01  | Building an Authorization Server | Design issuer, endpoints, clients, grants, tokens, keys, and consent               |
| 02  | Building a Resource Server       | Validate access tokens and enforce scope/audience/resource authorization           |
| 03  | Building a Client Application    | Build a secure OAuth/OIDC client with state, PKCE, redirect handling, and sessions |
| 04  | Popular Libraries                | Compare Passport and Spring Security integration patterns                          |
| 05  | Identity Providers               | Integrate Auth0, Okta, and Keycloak without losing protocol control                |
| 06  | SSO Implementation               | Design SSO sessions, federation, logout, and trust relationships                   |

## Recommended architecture

```text
                    +----------------------+
                    | Authorization Server |
                    |   OAuth 2.0 + OIDC   |
                    +----------+-----------+
                               |
                 +-------------+-------------+
                 |                           |
                 v                           v
          +-------------+             +-------------+
          |    Client   |             |   Resource  |
          | / Relying   |             |   Server    |
          |   Party     |             |    / API    |
          +------+------+             +------+------+
                 |                           ^
                 +----------- Access Token ---+
```

## Engineering principle

A library is an implementation tool. It does not remove the need to understand:

- redirect URI validation
- issuer and audience validation
- PKCE
- state and nonce
- token audience/resource indicators
- client authentication
- key rotation
- revocation and incident response

Primary security baseline: RFC 9700, OAuth 2.0 Security Best Current Practice.
