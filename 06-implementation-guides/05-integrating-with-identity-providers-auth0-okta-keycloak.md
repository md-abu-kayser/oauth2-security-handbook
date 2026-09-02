# 05 — Integrating with Identity Providers: Auth0, Okta, Keycloak

## 1. Provider integration principle

Vendor-specific consoles differ, but the protocol contract remains:

```text
issuer
authorization endpoint
token endpoint
JWKS
userinfo
client registration
scopes
claims
logout
```

Keep your application code centered on the protocol where possible.

## 2. Configuration checklist

For each provider record:

```text
issuer
client_id
client authentication method
redirect URIs
allowed origins
grant types
scopes
audience/resource
signing algorithms
logout endpoints
environment-specific config
```

## 3. Auth0

Typical use cases:

- managed OIDC login
- API authorization
- organizations / tenants
- social identity federation

Treat custom claims and provider-specific rules as an integration layer rather than hard-coding them
throughout the business domain.

## 4. Okta

Typical enterprise considerations:

- multiple authorization servers
- group / claim mapping
- application assignments
- enterprise SSO
- lifecycle and policy integration

Issuer selection must be explicit. Do not accept any issuer merely because it belongs to the same vendor.

## 5. Keycloak

Keycloak is useful for self-hosted identity infrastructure.

Typical engineering concerns:

```text
realm
client
roles
groups
identity providers
protocol mappers
keys
sessions
```

Be precise about whether your application is using client roles, realm roles, scopes, or custom claims.

## 6. Vendor-neutral adapter

Use an interface such as:

```ts
interface IdentityProvider {
  issuer: string;
  authorizationEndpoint: string;
  tokenEndpoint: string;
  jwksUri: string;
  userInfoEndpoint?: string;
}
```

Then map provider metadata into this stable internal abstraction.

## 7. Environment separation

Never reuse production clients in development:

```text
dev issuer / dev client
staging issuer / staging client
production issuer / production client
```

Redirect URI registrations should be isolated accordingly.

## 8. Migration strategy

When changing providers:

```text
inventory claims
→ map subject identities
→ register clients
→ validate new issuer
→ dual-run where practical
→ migrate sessions
→ rotate credentials
→ remove old trust
```

The most difficult part is often identity continuity, not the OAuth endpoints.

## 9. Exercise

Integrate one application with two providers and build an adapter layer so the application receives:

```text
provider
provider_subject
email
email_verified
display_name
```

Document what is provider-specific and what is application-internal.
