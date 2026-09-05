# 01 — Setup and Authorization Server

## 1. Project goal

Implement the minimum Authorization Server surface required for a controlled learning environment:

```text
GET  /oauth/authorize
POST /oauth/token
POST /oauth/revoke
```

Optionally add introspection later.

## 2. Component boundaries

The Authorization Server owns:

```text
client registration
authorization requests
user consent
authorization-code issuance
token issuance
client authentication
refresh policy
```

The Resource Server owns:

```text
credential validation
scope enforcement
business authorization
resource ownership
```

Do not put every business rule into the Authorization Server.

## 3. Core tables

```text
oauth_clients
authorization_codes
users
consents
refresh_tokens
signing_keys
audit_events
```

Authorization codes should have server-side state such as:

```text
code_hash
client_id
redirect_uri
subject
scope
code_challenge
created_at
expires_at
consumed_at
```

Store sensitive one-time credentials in a form appropriate to your threat model rather than casually persisting raw values.

## 4. Authorization request validation

Validate before asking the user to approve anything:

```text
client_id exists
redirect_uri is registered
response_type is supported
scope is permitted
PKCE parameters satisfy policy
state is returned to the same client transaction
```

Never redirect an error to an unvalidated URI.

## 5. Consent

Render human-readable permissions:

```text
users:read   Read your profile
orders:read  Read your orders
```

Do not show only raw scope strings. Users need to understand the consequence of consent.

## 6. Token endpoint

Authorization Code exchange concept:

```http
POST /oauth/token
Content-Type: application/x-www-form-urlencoded

grant_type=authorization_code
code=...
redirect_uri=...
client_id=...
code_verifier=...
```

Validate:

```text
code exists
code not expired
code not consumed
client matches
redirect_uri matches
PKCE verifier matches challenge
```

## 7. Access Token policy

Define a documented claim contract. Example:

```json
{
  "iss": "https://auth.example.com",
  "sub": "user-123",
  "aud": "https://api.example.com",
  "scope": "users:read orders:read",
  "iat": 1778000000,
  "exp": 1778000900,
  "jti": "token-123"
}
```

The Resource Server must enforce the contract; the example is not itself a security policy.

## 8. Failure cases

```text
unknown client
redirect mismatch
unsupported response type
unknown scope
expired code
replayed code
wrong verifier
invalid client authentication
```

## 9. Lab

Create a complete Authorization Code flow and write a protocol transcript with all secrets redacted. Then implement a test proving the same code cannot be exchanged twice.
