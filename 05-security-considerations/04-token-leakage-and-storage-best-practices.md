# 04 — Token Leakage and Storage Best Practices

## 1. Treat tokens as credentials

Bearer tokens can confer access to whoever possesses them. Every additional copy increases attack surface.

## 2. Leakage paths

| Location        | Risk                     |
| --------------- | ------------------------ |
| URL query       | History, logs, referrers |
| Browser storage | XSS impact               |
| Server logs     | Long-lived copies        |
| Analytics       | Third-party replication  |
| Error traces    | Accidental persistence   |
| Screenshots     | Human disclosure         |

## 3. Browser-facing architecture

A BFF/server-session pattern can reduce the amount of long-lived OAuth token material exposed to browser JavaScript:

```text
Browser → secure session cookie → BFF → token store → API
```

This is not a universal answer, but it is a useful architecture to evaluate when minimizing browser credential exposure.

## 4. Cookies

A local application session often uses flags such as:

```http
Set-Cookie: __Host-session=...; Secure; HttpOnly; SameSite=Lax
```

Choose `SameSite` according to actual cross-site requirements. `HttpOnly` helps prevent script access to the cookie but does not eliminate XSS.

## 5. Logging

Never log raw:

```text
Authorization: Bearer ...
client_secret=...
refresh_token=...
authorization_code=...
```

Use redaction and structured logging.

## 6. Refresh tokens

Refresh tokens deserve strong protection because they can sustain access longer than a short-lived access token. Evaluate rotation, reuse detection, revocation, storage, and incident response.

## 7. Leak response

```text
detect → identify scope → revoke/invalidate → rotate affected credentials → investigate → monitor
```

The exact response depends on which artifact leaked and where.

## 8. Exercise

Audit one codebase for `Bearer`, `access_token`, `refresh_token`, `client_secret`, and `authorization_code`. Classify each occurrence as safe, sensitive, or unacceptable.

> **Handbook note**
>
> This chapter is written as an engineering reference. Examples are simplified; validate every security decision against the applicable standards and your system threat model.
