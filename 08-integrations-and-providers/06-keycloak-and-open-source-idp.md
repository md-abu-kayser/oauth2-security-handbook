# 06 — Keycloak and Open-Source Identity Providers

Self-hosted identity providers are valuable for learning because you can observe the complete OAuth/OIDC system under your control.

## 1. Why Keycloak is useful for a handbook

A local IdP lets you experiment with:

```text
realms
clients
users
roles
scopes
claims
OIDC discovery
JWKS
Authorization Code
PKCE
service accounts
token lifetimes
logout
```

## 2. Reference architecture

```text
                 +----------------+
                 |   Keycloak     |
                 | Authorization  |
                 | Server / OP    |
                 +-------+--------+
                         |
              +----------+----------+
              |                     |
              v                     v
        Web Client                API
              |                     ^
              +---- Access Token ---+
```

## 3. Realm and client concepts

Conceptually:

```text
Realm
  |
  +-- Users
  +-- Roles
  +-- Clients
  +-- Client scopes
  +-- Identity providers
```

Keep development realms separate from production realms.

## 4. Discovery

Your client should be able to discover provider metadata from the configured issuer.

Conceptual:

```text
<issuer>/.well-known/openid-configuration
```

Then discover:

```text
authorization endpoint
token endpoint
userinfo endpoint
jwks URI
```

## 5. JWKS testing

Keycloak is ideal for demonstrating key rotation.

Exercise:

```text
1. Issue ID Token
2. Verify using JWKS
3. Rotate signing key
4. Refresh metadata / keys
5. Verify new token
6. Verify old valid token according to your configured policy
```

## 6. Client types

Model:

```text
public client
confidential client
```

Then compare:

```text
secret-based authentication
vs
PKCE
```

## 7. Docker lab

A minimal local environment might look like:

```yaml
services:
  keycloak:
    image: quay.io/keycloak/keycloak:latest
    command: start-dev
    environment:
      KC_BOOTSTRAP_ADMIN_USERNAME: admin
      KC_BOOTSTRAP_ADMIN_PASSWORD: change-me
    ports:
      - "8080:8080"
```

Pin a tested version for reproducible learning labs rather than relying on `latest` in production.

## 8. Open-source IdP comparison

Useful dimensions:

```text
OIDC support
OAuth support
SAML support
admin UX
clustering
database support
customization
extensions
secret management
audit logs
high availability
license
community
```

## 9. Lab

Build:

```text
Keycloak
   |
   +-- web-client
   |
   +-- resource-server
   |
   +-- test-user
```

Implement:

```text
login
token validation
scope authorization
role-based authorization
logout
key rotation test
```
