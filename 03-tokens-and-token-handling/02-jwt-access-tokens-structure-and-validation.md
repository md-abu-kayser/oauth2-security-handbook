# 02 — JWT Access Tokens: Structure and Validation

> **Handbook standard:** This chapter is written as a practical engineering reference. It separates protocol semantics from implementation choices and highlights security implications.

## Learning objectives
- Explain the protocol concept in precise terminology.
- Trace the relevant HTTP messages and trust boundaries.
- Recognize implementation and security failure modes.
- Apply the concept in production-oriented designs.

## Practical mindset
OAuth is an authorization framework, not a login protocol by itself. Treat tokens as security credentials, minimize privilege, validate inputs at trust boundaries, and prefer current security best practices over legacy interoperability shortcuts.

## JWT structure
A compact JWT contains three base64url-encoded parts separated by dots:

```text
header.payload.signature
```

Example header:
```json
{"alg":"RS256","typ":"JWT","kid":"key-2026-01"}
```

Example claims:
```json
{
  "iss": "https://auth.example.com",
  "sub": "user-123",
  "aud": "https://api.example.com",
  "exp": 1767225600,
  "iat": 1767222000,
  "scope": "orders:read"
}
```

## Validation order
1. Parse safely.
2. Select a trusted verification key based on validated metadata such as `kid`.
3. Enforce an algorithm allow-list.
4. Verify the signature.
5. Validate `iss`, `aud`, time claims, token type/profile requirements, and authorization claims.
6. Apply local endpoint authorization policy.

## Dangerous misconception
Decoding a JWT is not validation. The payload is readable without proving integrity. Never authorize based on claims before signature and semantic validation.

## Key rotation
Use published keys/JWK sets or an equivalent trusted distribution mechanism. Cache safely, handle rotation, and avoid trusting arbitrary key URLs supplied by untrusted token contents.


## Standards and references
- [RFC 7519 — JSON Web Token](https://www.rfc-editor.org/rfc/rfc7519.html)
- [RFC 8725 — JWT Best Current Practices](https://www.rfc-editor.org/rfc/rfc8725.html)
- [RFC 9068 — JWT Profile for OAuth 2.0 Access Tokens](https://www.rfc-editor.org/rfc/rfc9068.html)

---

**Next:** Continue to the next chapter in this section.
