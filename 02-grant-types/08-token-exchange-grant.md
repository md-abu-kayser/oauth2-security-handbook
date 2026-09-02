# 08 — Token Exchange Grant

> **Handbook standard:** This chapter is written as a practical engineering reference. It separates protocol semantics from implementation choices and highlights security implications.

## Learning objectives

- Explain the protocol concept in precise terminology.
- Trace the relevant HTTP messages and trust boundaries.
- Recognize implementation and security failure modes.
- Apply the concept in production-oriented designs.

## Practical mindset

OAuth is an authorization framework, not a login protocol by itself. Treat tokens as security credentials, minimize privilege, validate inputs at trust boundaries, and prefer current security best practices over legacy interoperability shortcuts.

## Concept

Token Exchange lets a client exchange one security token for another token that is appropriate for a different audience, actor, or delegation context.

Typical enterprise examples include service-to-service delegation, workload identity transitions, and down-scoped access.

## Conceptual request

```http
POST /token
Content-Type: application/x-www-form-urlencoded

grant_type=urn:ietf:params:oauth:grant-type:token-exchange
subject_token=...
subject_token_type=urn:ietf:params:oauth:token-type:access_token
audience=https%3A%2F%2Fapi.example.com
scope=orders:read
```

## Design questions

- Who is the subject?
- Which party is acting?
- What audience should receive the new token?
- Is the new token narrower than the original authority?
- Is delegation auditable?

Avoid blindly forwarding high-privilege tokens across microservices.

## Standards and references

- [RFC 8693 — OAuth 2.0 Token Exchange](https://www.rfc-editor.org/rfc/rfc8693.html)
- [RFC 9700](https://www.rfc-editor.org/rfc/rfc9700.html)

---

**Next:** Continue to the next chapter in this section.
