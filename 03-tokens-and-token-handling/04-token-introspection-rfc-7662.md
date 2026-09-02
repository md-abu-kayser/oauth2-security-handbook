# 04 — Token Introspection (RFC 7662)

> **Handbook standard:** This chapter is written as a practical engineering reference. It separates protocol semantics from implementation choices and highlights security implications.

## Learning objectives
- Explain the protocol concept in precise terminology.
- Trace the relevant HTTP messages and trust boundaries.
- Recognize implementation and security failure modes.
- Apply the concept in production-oriented designs.

## Practical mindset
OAuth is an authorization framework, not a login protocol by itself. Treat tokens as security credentials, minimize privilege, validate inputs at trust boundaries, and prefer current security best practices over legacy interoperability shortcuts.

## Purpose
Introspection lets an authorized protected resource ask the authorization server about a token's active state and relevant metadata.

Example:
```http
POST /introspect
Authorization: Basic <resource-server-auth>
Content-Type: application/x-www-form-urlencoded

token=opaque-token-123
```

Example response:
```json
{
  "active": true,
  "scope": "orders:read",
  "client_id": "web-app",
  "sub": "user-123",
  "aud": "orders-api",
  "exp": 1767225600
}
```

## Operational trade-offs
Introspection provides centralized control but adds network dependency and latency. Cache decisions only with a carefully designed freshness window; aggressive caching can undermine revocation expectations.

## Security
Protect the introspection endpoint against token scanning. Authenticate the caller and return only the metadata needed for authorization.


## Standards and references
- [RFC 7662 — Token Introspection](https://www.rfc-editor.org/rfc/rfc7662.html)
- [RFC 9700](https://www.rfc-editor.org/rfc/rfc9700.html)

---

**Next:** Continue to the next chapter in this section.
