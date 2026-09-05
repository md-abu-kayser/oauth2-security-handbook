# 07 — Social Login Best Practices

Social login is an identity federation problem, not merely a collection of “Login with X” buttons.

## 1. The correct mental model

```text
Provider
   |
   | authenticate user
   v
Application
   |
   | normalize identity
   v
Local account
   |
   | local authorization/session
   v
Application features
```

The provider authenticates the external identity. Your application still owns local session policy and application authorization.

## 2. Never trust email as the only external identity key

Use a tuple such as:

```text
(provider issuer, provider subject)
```

Email can be:

```text
missing
changed
unverified
reassigned
provider-specific
```

Treat it as profile data unless the provider contract explicitly establishes stronger semantics.

## 3. Account linking

Dangerous flow:

```text
Login with Google
email = user@example.com
=> automatically merge with password account
```

Safer:

```text
User proves control of existing account
        +
provider identity is validated
        |
        v
explicit account linking
```

## 4. State and PKCE

Every browser authorization integration should implement appropriate transaction binding.

For modern Authorization Code flows:

```text
state
+
PKCE
+
strict redirect URI validation
```

OAuth Security BCP emphasizes exact redirect URI matching, avoidance of open redirectors, and PKCE protections for authorization-code flows. citeturn143287search0turn143287search2

## 5. Normalize providers

Create one abstraction:

```ts
type SocialProfile = {
  provider: string;
  issuer: string;
  subject: string;
  email?: string;
  emailVerified?: boolean;
  name?: string;
  avatarUrl?: string;
};
```

Provider adapters return this type.

## 6. Scope minimization

Ask only for:

```text
identity
+
minimum profile
+
minimum API permissions
```

Do not request unrelated write permissions simply because the provider offers them.

## 7. Session design

Provider login should normally end in your own application session model:

```text
Provider authentication
       |
       v
validate response
       |
       v
load external identity
       |
       v
find/create local account
       |
       v
rotate/create local session
```

## 8. Provider failure handling

Handle:

```text
user_cancelled
authorization_denied
invalid_code
expired_code
invalid_grant
provider_outage
rate_limit
insufficient_scope
account_unavailable
```

Do not expose provider internals directly to end users.

## 9. Social-login test matrix

Test each provider for:

```text
first login
returning user
different provider account
same email from another provider
email missing
email unverified
user denies consent
token revoked
provider unavailable
callback replay
state mismatch
PKCE mismatch
```

## 10. Production checklist

```text
[ ] exact redirect URI
[ ] HTTPS
[ ] state validation
[ ] PKCE
[ ] issuer validation where OIDC is used
[ ] audience validation
[ ] secure token handling
[ ] no token logging
[ ] minimum scopes
[ ] explicit account linking
[ ] provider identity keyed by issuer + subject
[ ] local session rotation
[ ] provider error mapping
[ ] monitoring
```

## Capstone

Build a multi-provider login service:

```text
Google
GitHub
Microsoft
Auth0
Keycloak
```

All providers should feed a single:

```text
Identity -> Account -> Session
```

pipeline.

The application should remain provider-agnostic after the adapter boundary.
