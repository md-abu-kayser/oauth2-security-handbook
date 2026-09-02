# 01 — Building an Authorization Server

## 1. Scope

An authorization server is a security-critical platform. A serious implementation needs more than an
`/authorize` route and a `/token` route.

Core responsibilities include:

```text
client registration
authorization request validation
user authentication
consent
authorization code issuance
token issuance
refresh handling
client authentication
key management
metadata
revocation
auditing
rate limiting
```

## 2. Logical architecture

````mermaid
flowchart TD
    A[Authorization Request] --> B[Request Validator]
    B --> C[Client Registry]
    C --> D[User Authentication]
    D --> E[Consent / Policy]
    E --> F[Authorization Transaction Store]
    F --> G[Code Issuer]

    G --> H[Token Endpoint]
    H --> I[Code + PKCE Validation]
    I --> J[Client Authentication]
    J --> K[Token Service]
    K --> L[Access Token]
    K --> M[Refresh Token]
    K --> N[ID Token for OIDC]

    O[Key Management] --> K
    P[Revocation / Session Store] --> K
    Q[Audit / Security Events] --> B


## 3. Data model

A minimal production-oriented model can contain:

```text
clients
authorization_transactions
authorization_codes
consents
users
sessions
refresh_tokens
signing_keys
revocations
audit_events
````

Do not put raw bearer credentials in ordinary logs or analytics tables.

## 4. Authorization request validation

Validate before authenticating or issuing a code:

- known `client_id`
- exact registered `redirect_uri`
- allowed response type
- allowed scope
- valid PKCE parameters where required
- valid state handling
- valid request object / PAR references where supported
- allowed prompt / max_age / claims behavior for OIDC
- resource indicator policy where applicable

## 5. Authorization code properties

A strong code should be:

- short-lived
- single-use
- bound to the client
- bound to the redirect URI / transaction
- bound to PKCE where used
- stored safely, preferably as a hash or protected record rather than as a raw reusable secret

Conceptually:

```text
code
 ├── client_id
 ├── redirect_uri
 ├── code_challenge
 ├── subject
 ├── scope
 ├── resource
 ├── created_at
 └── expires_at
```

## 6. Token service

Separate token issuance from HTTP routing.

```text
HTTP request
   ↓
authentication / validation
   ↓
authorization transaction
   ↓
TokenService.issue()
   ↓
credential representation
```

This improves testing and makes it easier to implement JWT, opaque tokens, or sender-constrained
tokens consistently.

## 7. Signing keys

Use a key lifecycle:

```text
generate → publish public key → sign → rotate → overlap → retire
```

Expose public verification keys via JWKS where appropriate.

The `kid` header is a key-selection hint. It does not prove trust.

## 8. Access token design

Decide explicitly:

```text
JWT vs opaque
audience model
scope representation
resource server identification
lifetime
sender constraint
revocation behavior
```

A JWT access token can reduce introspection calls, while an opaque token can make centralized state
easier. The decision is architectural, not ideological.

## 9. Refresh token design

For browser-facing and public-client scenarios, assess rotation and reuse detection. A refresh token
should have an explicit family / session model so suspicious reuse can invalidate the affected chain.

## 10. Authorization server endpoints

Typical surface:

```text
GET  /.well-known/oauth-authorization-server
GET  /.well-known/openid-configuration
GET  /authorize
POST /token
POST /introspect
POST /revoke
GET  /userinfo
POST /par
POST /connect/register       (when dynamic registration is enabled)
GET  /jwks.json
```

Not every deployment needs every endpoint.

## 11. Operational controls

Add:

- rate limiting
- brute-force protections at authentication layer
- abuse detection
- structured security events
- key rotation monitoring
- configuration validation
- backups / recovery
- clock synchronization
- incident response

## 12. Test plan

Negative tests are critical:

```text
unknown client
wrong redirect URI
invalid scope
expired code
reused code
wrong PKCE verifier
wrong client authentication
invalid refresh token
revoked refresh token
unknown signing key
unsupported grant
```

## 13. Build exercise

Implement a deliberately small lab authorization server with:

```text
Authorization Code + PKCE
client registry
authorization code store
token endpoint
JWT access token
refresh token rotation
OIDC ID Token
JWKS endpoint
revoke endpoint
```

Then document every security assumption.
