# 04 — Using Popular Libraries: Passport and Spring Security

## 1. Libraries reduce code, not responsibility

Frameworks provide protocol building blocks. Developers still need to configure:

```text
issuer
client ID
redirect URI
scopes
PKCE
session policy
token validation
audience/resource validation
secret management
logout behavior
```

## 2. Passport.js mental model

Passport is middleware-oriented.

A typical architecture is:

```text
Express
  ↓
Passport strategy
  ↓
provider redirect / callback
  ↓
application session
```

Common risks:

- copying an old strategy configuration
- accepting broad callback URLs
- treating profile data as verified without checking provider semantics
- leaking tokens into session serialization
- confusing authentication success with application authorization

## 3. Spring Security mental model

Spring Security provides a more integrated model for:

- OAuth2 Client
- Resource Server
- OIDC Login
- JWT validation
- method-level authorization

Typical resource-server configuration conceptually declares:

```yaml
spring:
  security:
    oauth2:
      resourceserver:
        jwt:
          issuer-uri: https://idp.example.com
```

The framework can discover metadata and signing keys, but your application still needs correct
authority mapping and endpoint authorization.

## 4. Authority mapping

Provider scopes may appear as:

```text
SCOPE_read
SCOPE_write
```

Your business rules might need:

```text
ROLE_ADMIN
TENANT_MANAGER
ORDER_OWNER
```

Do the mapping deliberately.

## 5. Framework update strategy

Security libraries change quickly.

Maintain:

```text
dependency lockfile
security advisories
configuration tests
integration tests
migration notes
```

Avoid blindly copying deprecated configuration from old tutorials.

## 6. Comparison

| Concern         | Passport                   | Spring Security                     |
| --------------- | -------------------------- | ----------------------------------- |
| Ecosystem       | Node.js                    | Java / Spring                       |
| Style           | Middleware / strategies    | Integrated security framework       |
| Resource server | Via middleware / libraries | First-class                         |
| OIDC login      | Strategy-driven            | First-class                         |
| Configuration   | Code + strategy config     | Java / YAML / Kotlin                |
| Main risk       | Strategy/config sprawl     | Complex authorization configuration |

## 7. Exercise

Build the same API twice:

```text
Node.js + Passport / OAuth library
Java + Spring Security Resource Server
```

Write a protocol-level test suite and verify that both implementations reject the same invalid tokens.
