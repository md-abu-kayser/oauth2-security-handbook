# 03 — Facebook Login / OAuth Setup

Facebook Login is a provider-specific identity and authorization integration built around Meta's platform. Provider setup and permissions can change, so verify the current Meta developer documentation before production deployment.

## 1. Architecture

```text
Browser
  |
  v
Your Application
  |
  | Authorization Request
  v
Meta / Facebook Login
  |
  | code
  v
Callback
  |
  | token exchange
  v
Access Token
  |
  v
Graph API / provider resources
```

## 2. App registration

Conceptually configure:

```text
Meta App
Facebook Login product
Application identifiers
Valid OAuth Redirect URIs
Allowed domains / platform settings
Requested permissions
```

Keep development and production credentials isolated.

## 3. Authorization request

Typical conceptual parameters:

```text
client_id
redirect_uri
response_type=code
scope=...
state=...
```

The exact endpoint and permitted permissions depend on the current provider product/version.

## 4. Callback handling

Validate:

```text
state
authorization error
code presence
redirect URI
transaction expiry
```

Then exchange the code server-side where applicable.

## 5. Identity mapping

Do not assume that:

```text
email = immutable provider identity
```

Prefer the provider's stable user identifier plus provider identity context.

Example conceptual local key:

```text
provider = facebook
provider_subject = <stable-provider-id>
```

## 6. Permissions and least privilege

Ask for the minimum permissions necessary.

Document:

```text
Feature -> Meta permission -> reason
```

A social login integration should not ask for unrelated content-management permissions merely because they are available.

## 7. Failure cases

Test:

```text
user cancels
permission denied
code expired
redirect mismatch
invalid app configuration
token exchange failure
API permission failure
provider account changes
```

## 8. Practical exercise

Implement a provider adapter:

```ts
interface SocialProvider {
  getAuthorizationUrl(state: string): string;
  exchangeCode(code: string): Promise<TokenSet>;
  getProfile(accessToken: string): Promise<ProviderProfile>;
}
```

Then keep Meta-specific logic isolated from your core account/session system.
