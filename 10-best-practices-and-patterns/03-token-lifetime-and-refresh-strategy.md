# 03 — Token Lifetime and Refresh Strategy

Token lifetime is a risk-management decision.

## 1. Why short-lived Access Tokens?

If a bearer token leaks:

```text
long lifetime
   = larger attack window
```

A shorter lifetime reduces the window, though it does not eliminate replay risk.

## 2. Common model

```text
Short-lived Access Token
          +
Protected Refresh Token / Session
```

The exact design depends on the client type and provider.

## 3. Refresh rotation

Conceptually:

```text
Refresh A
   |
   v
Refresh B
   |
   v
A invalid
```

Reuse detection can reveal theft.

## 4. Refresh token security

Treat refresh credentials as high-value secrets.

```text
encrypted storage
server-side when possible
no logs
restricted database access
rotation
revocation
incident response
```

## 5. Browser applications

For browser apps, choose deliberately between:

```text
BFF/session architecture
or
browser token architecture
```

A Backend-for-Frontend can keep OAuth tokens server-side and expose only a secure application session to the browser.

## 6. Token lifetime decision

Evaluate:

```text
risk
API sensitivity
user experience
offline requirements
provider behavior
revocation capability
```

Do not choose:

```text
24-hour token
```

just because refreshing “is annoying”.

## 7. Audience restriction

A token should not be valid for unrelated APIs.

```text
Access Token
  |
  +--> aud = api.example.com
```

The resource server should validate the audience it expects.

## 8. Refresh failure

When refresh fails:

```text
invalid_grant
       |
       v
invalidate local session
       |
       v
require re-authentication
```

Do not blindly retry forever.

## Lab

Create a token lifecycle state machine:

```text
issued
  -> active
  -> near-expiry
  -> refreshed
  -> revoked
  -> expired
```

Write tests for every transition.
