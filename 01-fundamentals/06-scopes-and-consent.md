# 06 — Scopes and Consent

> **Handbook standard:** This chapter is written as a practical engineering reference. It separates protocol semantics from implementation choices and highlights security implications.

## Learning objectives

- Explain the protocol concept in precise terminology.
- Trace the relevant HTTP messages and trust boundaries.
- Recognize implementation and security failure modes.
- Apply the concept in production-oriented designs.

## Practical mindset

OAuth is an authorization framework, not a login protocol by itself. Treat tokens as security credentials, minimize privilege, validate inputs at trust boundaries, and prefer current security best practices over legacy interoperability shortcuts.

## 1. Scopes are permission vocabulary

A scope is a token request parameter and authorization-server policy input. It should express the minimum capability the client needs.

Good:

```text
profile:read
orders:read
orders:write
```

Risky:

```text
admin
*
all
```

## 2. Consent is not authorization by itself

A user approving a scope does not mean the client can call every endpoint. The resource server still makes an authorization decision based on the validated token and its local policy.

## 3. Scope vs role

A scope answers: **what capability was delegated to the client?** A role often answers: **what business role does this subject have?** They can be related but should not be treated as interchangeable.

## 4. Practical design

Create a scope matrix:

| API operation        | Required scope  | Additional policy  |
| -------------------- | --------------- | ------------------ |
| `GET /orders`        | `orders:read`   | Tenant match       |
| `POST /orders`       | `orders:write`  | Customer ownership |
| `DELETE /orders/:id` | `orders:delete` | Elevated approval  |

Minimize requested scopes and make consent screens understandable to users.

## Standards and references

- [RFC 6749](https://www.rfc-editor.org/rfc/rfc6749.html)
- [RFC 9700](https://www.rfc-editor.org/rfc/rfc9700.html)

---

**Next:** Continue to the next chapter in this section.
