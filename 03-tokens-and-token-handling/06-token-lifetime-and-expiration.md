# 06 — Token Lifetime and Expiration

> **Handbook standard:** This chapter is written as a practical engineering reference. It separates protocol semantics from implementation choices and highlights security implications.

## Learning objectives
- Explain the protocol concept in precise terminology.
- Trace the relevant HTTP messages and trust boundaries.
- Recognize implementation and security failure modes.
- Apply the concept in production-oriented designs.

## Practical mindset
OAuth is an authorization framework, not a login protocol by itself. Treat tokens as security credentials, minimize privilege, validate inputs at trust boundaries, and prefer current security best practices over legacy interoperability shortcuts.

## Why lifetime matters
A leaked bearer token can often be replayed until it expires or is otherwise invalidated. Lifetime is therefore a security control, not just a usability setting.

## Layered expiry model
```text
Access token      → short lifetime
Refresh token     → longer lifetime + rotation/reuse detection
Authorization code→ very short lifetime + one-time use
State value       → transaction-scoped + short lifetime
```

## Balancing security and UX
Shorter access-token lifetimes increase refresh traffic; longer lifetimes increase replay exposure. Choose based on resource sensitivity, client profile, threat model, and operational reliability.

## Clock skew
Distributed systems have imperfect clocks. Validate time claims with a bounded, documented skew rather than accepting arbitrarily expired tokens.

## Incident response
Build explicit behavior for expiration, refresh failure, revoked credentials, and invalid audience/issuer conditions. Avoid infinite silent refresh loops.


## Standards and references
- [RFC 6749](https://www.rfc-editor.org/rfc/rfc6749.html)
- [RFC 9700](https://www.rfc-editor.org/rfc/rfc9700.html)
- [RFC 9068](https://www.rfc-editor.org/rfc/rfc9068.html)

---

**Next:** Continue to the next chapter in this section.
