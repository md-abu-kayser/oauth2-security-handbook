# 03 — Session Management

## 1. OAuth session vs application session

Treat them as different:

```text
Provider authentication
       ↓
validated identity / credentials
       ↓
application session
```

## 2. Secure cookie model

For cookie-based sessions consider:

```text
Secure
HttpOnly
SameSite
appropriate Path / Domain
expiration
session rotation
```

`HttpOnly` limits JavaScript access; it is not a complete CSRF defense.

## 3. Session fixation

After authentication, rotate or replace the pre-authentication session identifier.

## 4. Logout

Define separately:

```text
local session invalidation
provider logout
token revocation
refresh-token invalidation
```

## 5. BFF model

```text
Browser
  ↓ secure session cookie
BFF
  ↓
OAuth tokens
  ↓
API
```

This can simplify browser credential exposure, but introduces server-side session infrastructure.

## 6. Lab

Test:

```text
valid session
expired session
revoked session
logout replay
session fixation attempt
```
