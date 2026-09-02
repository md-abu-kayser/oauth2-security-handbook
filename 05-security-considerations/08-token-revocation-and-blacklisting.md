# 08 — Token Revocation and Blacklisting

## 1. Why revocation exists

Tokens may need invalidation before natural expiry because of logout, credential compromise, account disablement, client decommissioning, or an incident.

## 2. RFC 7009

OAuth Token Revocation defines a revocation endpoint. A simplified request can look like:

```http
POST /revoke
Content-Type: application/x-www-form-urlencoded

token=...&token_type_hint=refresh_token
```

## 3. JWT revocation trade-off

A self-contained JWT can often be validated without a network round-trip, but immediate revocation is harder. A blacklist, shorter lifetime, introspection, or a combination may be used depending on requirements.

## 4. Blacklisting

A simple model:

```text
jti → revoked until timestamp
```

Trade-offs include storage, cache consistency, synchronization, and performance.

## 5. Short-lived tokens + refresh controls

A common pattern is:

```text
short-lived access token
+ protected refresh token
+ rotation / reuse detection where supported
+ revocation
```

## 6. Introspection

Opaque access tokens can be checked at an introspection endpoint to learn whether they are currently active. This adds latency and an availability dependency.

## 7. Logout is not one thing

Distinguish:

```text
local session logout
refresh token revocation
access token invalidation
provider session termination
single logout across systems
```

Do not claim that clearing a browser cookie automatically revokes every external credential.

## 8. Exercise

Design a revocation strategy for a high-volume SaaS application and document consistency, availability, and latency trade-offs.

> **Handbook note**
>
> This chapter is written as an engineering reference. Examples are simplified; validate every security decision against the applicable standards and your system threat model.
