# 05 — Auth0 and Okta Integration

Auth0 and Okta provide managed identity capabilities around OAuth 2.0 and OIDC. The engineering lesson is not “use an SDK and forget the protocol”; it is to understand what the platform is doing on your behalf.

Auth0 documents Authorization Code and Authorization Code + PKCE flows, while Okta documents OAuth/OIDC relationships and recommends Authorization Code with PKCE for SPAs/native applications using redirects. citeturn145506search1turn145506search8turn145506search2

## 1. Common architecture

```text
Your Application
      |
      v
Managed Identity Provider
      |
      +--> OIDC authentication
      |
      +--> OAuth authorization
      |
      v
Protected API
```

## 2. Auth0

For a regular server-side web app:

```text
Authorization Code
+
confidential client authentication
```

Auth0 documents the authorization endpoint, callback, authorization code, token exchange, and optional ID/Access/Refresh Tokens for this flow. citeturn145506search0turn145506search4

For public clients:

```text
Authorization Code + PKCE
```

Auth0 documents PKCE specifically for clients that cannot securely hold a secret, including native and SPA applications. citeturn145506search8

## 3. Okta

Okta describes OAuth 2.0 as authorization and OIDC as authentication layered over OAuth 2.0. Its documentation recommends Authorization Code with PKCE for SPA/native redirect models. citeturn145506search2

## 4. Provider abstraction

Do not spread provider SDK calls across your entire application.

Prefer:

```text
controllers
    |
    v
identity service
    |
    +---- Auth0 adapter
    +---- Okta adapter
    +---- Google adapter
    +---- GitHub adapter
```

The rest of the application consumes a normalized identity model.

## 5. Normalized identity

Example:

```ts
type ExternalIdentity = {
  issuer: string;
  subject: string;
  email?: string;
  name?: string;
  provider: string;
};
```

Use:

```text
issuer + subject
```

as the external identity key rather than assuming email is globally immutable.

## 6. Claims and mapping

Provider-specific claims differ. Build a mapping layer:

```text
Provider JWT / UserInfo
        |
        v
Provider Adapter
        |
        v
Normalized Identity
        |
        v
Application Account
```

## 7. Advanced security

Auth0 also documents integrations with PAR and RAR for more controlled authorization-request handling. citeturn145506search6turn145506search9

Study these features when your risk profile or regulated workflow requires them.

## 8. Lab

Implement two provider adapters:

```text
Auth0IdentityProvider
OktaIdentityProvider
```

Both must satisfy:

```ts
interface IdentityProvider {
  authorize(): string;
  callback(code: string): Promise<ExternalIdentity>;
  logout(): Promise<void>;
}
```

Then prove that your user/account service does not depend on provider-specific code.
