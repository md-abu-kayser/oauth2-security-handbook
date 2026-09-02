# 05 — Token Revocation (RFC 7009)

> **Handbook standard:** This chapter is written as a practical engineering reference. It separates protocol semantics from implementation choices and highlights security implications.

## Learning objectives
- Explain the protocol concept in precise terminology.
- Trace the relevant HTTP messages and trust boundaries.
- Recognize implementation and security failure modes.
- Apply the concept in production-oriented designs.

## Practical mindset
OAuth is an authorization framework, not a login protocol by itself. Treat tokens as security credentials, minimize privilege, validate inputs at trust boundaries, and prefer current security best practices over legacy interoperability shortcuts.

## Purpose
The revocation endpoint allows a client to request that a previously issued access or refresh token no longer be considered usable.

```http
POST /revoke
Authorization: Basic <client-auth>
Content-Type: application/x-www-form-urlencoded

token=rt_abc123&token_type_hint=refresh_token
```

## Important distinction
Revocation is a protocol operation; application sessions, cached authorization decisions, downstream copies, and other credentials may have separate lifecycles. Design the entire system for incident response.

## When to revoke
Examples include explicit sign-out, credential reset, consent withdrawal, device removal, detected refresh-token reuse, or other security events depending on policy.

## Implementation notes
Treat revocation calls as idempotent from the caller's perspective. Do not reveal whether an arbitrary token ever existed in ways that enable credential enumeration.


## Standards and references
- [RFC 7009 — Token Revocation](https://www.rfc-editor.org/rfc/rfc7009.html)
- [RFC 9700](https://www.rfc-editor.org/rfc/rfc9700.html)

---

**Next:** Continue to the next chapter in this section.
