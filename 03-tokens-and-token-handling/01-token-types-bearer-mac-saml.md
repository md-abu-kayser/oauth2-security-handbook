# 01 — Token Types: Bearer, MAC, and SAML

> **Handbook standard:** This chapter is written as a practical engineering reference. It separates protocol semantics from implementation choices and highlights security implications.

## Learning objectives
- Explain the protocol concept in precise terminology.
- Trace the relevant HTTP messages and trust boundaries.
- Recognize implementation and security failure modes.
- Apply the concept in production-oriented designs.

## Practical mindset
OAuth is an authorization framework, not a login protocol by itself. Treat tokens as security credentials, minimize privilege, validate inputs at trust boundaries, and prefer current security best practices over legacy interoperability shortcuts.

## Bearer tokens
Possession is generally enough to use a bearer token. That makes token theft particularly dangerous.

```http
Authorization: Bearer <access-token>
```

## MAC-style / proof-based concepts
Historical OAuth specifications explored message authentication mechanisms that bind requests to a secret rather than relying purely on possession. Modern deployments should follow currently supported sender-constrained standards and provider guidance rather than invent a custom MAC scheme.

## SAML assertions
SAML is an assertion format and ecosystem, commonly associated with enterprise identity federation. OAuth token handling is different: OAuth defines authorization flows, while SAML is often used for authentication/federation assertions.

## Practical selection
Prefer the simplest token model that meets the threat model. For ordinary APIs, bearer tokens over TLS may be enough; higher assurance environments may require sender-constrained access tokens.


## Standards and references
- [RFC 6750 — Bearer Token Usage](https://www.rfc-editor.org/rfc/rfc6750.html)
- [RFC 8705 — Mutual TLS](https://www.rfc-editor.org/rfc/rfc8705.html)
- [RFC 9449 — DPoP](https://www.rfc-editor.org/rfc/rfc9449.html)

---

**Next:** Continue to the next chapter in this section.
