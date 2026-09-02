# 09 — JWT Bearer Assertion Grant

> **Handbook standard:** This chapter is written as a practical engineering reference. It separates protocol semantics from implementation choices and highlights security implications.

## Learning objectives

- Explain the protocol concept in precise terminology.
- Trace the relevant HTTP messages and trust boundaries.
- Recognize implementation and security failure modes.
- Apply the concept in production-oriented designs.

## Practical mindset

OAuth is an authorization framework, not a login protocol by itself. Treat tokens as security credentials, minimize privilege, validate inputs at trust boundaries, and prefer current security best practices over legacy interoperability shortcuts.

## Concept

A client can present a JWT assertion as an OAuth authorization grant, and JWTs can also be used for client authentication profiles. This is useful where a workload has a cryptographic key or federated trust relationship instead of a static shared secret.

## Typical assertion claims

A JWT assertion commonly includes a controlled issuer, subject, audience, issued-at time, expiration, and a unique identifier when replay protection is needed. Exact requirements depend on the profile and authorization-server policy.

## Conceptual request

```http
POST /token
Content-Type: application/x-www-form-urlencoded

grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&assertion=eyJ...
```

## Security checklist

- Verify signature and trusted issuer.
- Verify intended audience.
- Enforce time validity with bounded clock skew.
- Prevent assertion replay when required.
- Pin accepted algorithms to an allow-list.
- Protect private signing keys.

## Standards and references

- [RFC 7523 — JWT Bearer Profile](https://www.rfc-editor.org/rfc/rfc7523.html)
- [RFC 9700](https://www.rfc-editor.org/rfc/rfc9700.html)

---

**Next:** Continue to the next chapter in this section.
