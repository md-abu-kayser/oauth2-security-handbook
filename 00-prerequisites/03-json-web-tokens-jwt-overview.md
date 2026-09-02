# 03 — JSON Web Tokens (JWT) Overview

> **Important:** JWT is a compact token format. **JWT is not OAuth, not encryption by default, and not automatically a secure authentication mechanism.**

---

## Learning objectives

By the end of this chapter, you should understand:

- What JWTs are and what problems they solve.
- JWS vs JWE at a high level.
- JWT structure, claims, signatures, and base64url encoding.
- Which claims commonly need validation.
- Why algorithm confusion, issuer confusion, and audience mistakes are dangerous.
- When JWTs are useful and when opaque tokens may be a better choice.

---

## 1. What is a JWT?

RFC 7519 defines a JSON Web Token as a compact, URL-safe representation of claims intended to be transferred between parties. JWT claims can be represented in a signed JWS or encrypted JWE structure. [RFC 7519](https://www.rfc-editor.org/rfc/rfc7519.html)

A common signed JWT has this visual form:

```text
HEADER.PAYLOAD.SIGNATURE
```

Example shape:

```text
eyJhbGciOiJSUzI1NiIsImtpZCI6IjEyMyJ9
.
eyJpc3MiOiJodHRwczovL2F1dGguZXhhbXBsZSIsImF1ZCI6ImFwaSIsImV4cCI6MT...
.
Qh2...signature...
```

The three segments are separated by `.`.

---

## 2. Base64url is encoding, not encryption

This is one of the most important lessons.

If a JWT payload contains:

```json
{
  "sub": "123",
  "role": "admin"
}
```

the payload is typically base64url-encoded. Anyone who obtains the JWT can often decode the payload without knowing the signing key.

Therefore:

```text
Base64url ≠ encryption
Signature ≠ confidentiality
JWE → encryption/confidentiality
```

Never place secrets such as passwords, private keys, or long-lived API credentials in a JWT payload merely because “it is signed.”

---

## 3. JWT structure

### Header

Usually describes how the object was secured.

```json
{
  "alg": "RS256",
  "kid": "key-2026-01",
  "typ": "JWT"
}
```

Important fields include:

- `alg` — cryptographic algorithm identifier.
- `kid` — key identifier, often used for key selection/rotation.
- `typ` — optional type signal.

### Payload / Claims Set

```json
{
  "iss": "https://auth.example.com",
  "sub": "user-123",
  "aud": "orders-api",
  "exp": 1790000000,
  "iat": 1789996400,
  "scope": "orders:read"
}
```

### Signature

For a JWS, the signature protects the integrity of the signed content.

Conceptually:

```text
signing_input = base64url(header) + "." + base64url(payload)

signature = Sign(private_key, signing_input)
```

The verifier performs the corresponding verification using a trusted key and acceptable algorithm.

---

## 4. Three-letter mental model: JWS vs JWE

```text
JWS → signed / integrity-protected content
JWE → encrypted content
JWT → claims format commonly carried by JWS or JWE
```

In many OAuth deployments, an access token may be JWT-shaped and signed, but OAuth does not require access tokens to be JWTs.

---

## 5. Registered claims

RFC 7519 defines several registered claim names.

| Claim | Meaning    | Typical validation concern               |
| ----- | ---------- | ---------------------------------------- |
| `iss` | Issuer     | Is this token from the expected issuer?  |
| `sub` | Subject    | Which principal does it represent?       |
| `aud` | Audience   | Is this token intended for this service? |
| `exp` | Expiration | Has it expired?                          |
| `nbf` | Not Before | Is it valid yet?                         |
| `iat` | Issued At  | When was it issued?                      |
| `jti` | JWT ID     | Can support replay/uniqueness handling   |

Not every claim is mandatory in every JWT profile, and validation requirements depend on the protocol and application.

---

## 6. Validation is a policy, not “decode()”

Never treat this as validation:

```js
const payload = JSON.parse(
  Buffer.from(token.split(".")[1], "base64url").toString(),
);

return payload.sub;
```

That merely decodes data.

A real verifier should establish at least:

```text
1. Well-formed token
2. Acceptable algorithm
3. Signature valid under a trusted key
4. Trusted issuer
5. Intended audience
6. Appropriate token type/profile
7. Valid time constraints
8. Application-specific claims/policy
```

RFC 8725 requires explicit algorithm verification and emphasizes issuer/audience validation and not blindly trusting received claims. [RFC 8725](https://www.rfc-editor.org/rfc/rfc8725.html)

---

## 7. Algorithm confusion

Do not let an untrusted token dictate which algorithms your application accepts.

Dangerous conceptual design:

```js
verify(token, key, { algorithms: [token.header.alg] }); // ❌
```

Better:

```js
verify(token, trustedKey, {
  algorithms: ["RS256"], // example: explicit application policy
});
```

The exact algorithms should be selected according to the protocol profile, key type, threat model, and current standards—not copied blindly from this example.

JWT best practice says libraries/applications should define acceptable algorithms rather than accepting arbitrary algorithms supplied by the token. [RFC 8725](https://www.rfc-editor.org/rfc/rfc8725.html)

---

## 8. Issuer and audience validation

Consider a system that trusts:

```text
https://auth.example.com
```

A token signed by a trusted key is not sufficient if the application cannot establish that the token is intended for its role.

Example:

```json
{
  "iss": "https://auth.example.com",
  "aud": "billing-api"
}
```

A request to `orders-api` should not automatically accept a token intended for `billing-api`.

RFC 8725 specifically recommends validating issuer and audience where applicable. [RFC 8725](https://www.rfc-editor.org/rfc/rfc8725.html)

---

## 9. JWT access token vs ID token

This distinction is essential in OAuth/OIDC systems.

### Access token

Intended for accessing protected resources:

```text
Client ── access token ──► Resource Server
```

### ID token

An OpenID Connect token carrying claims about authentication of the end-user:

```text
Authorization Server / OP ── ID Token ──► OIDC Client
```

OIDC defines the ID Token as a JWT carrying claims about the authentication event and end-user. [OpenID Connect Core](https://openid.net/specs/openid-connect-core-1_0.html)

**Do not automatically send an ID Token to an API as though it were an access token.**

---

## 10. JWTs and stateless APIs

A benefit of JWTs is that a resource server may validate a signed token locally, without calling an introspection endpoint for every request.

```text
Request
  │
  ├── JWT access token
  │
  ▼
Resource Server
  │
  ├── Verify signature
  ├── Validate issuer
  ├── Validate audience
  ├── Validate time
  └── Enforce scope/policy
  │
  ▼
Allow / deny
```

This can reduce network dependencies, but it creates trade-offs:

- Revocation can be harder.
- Claims remain valid until expiry unless additional mechanisms are used.
- Key rotation must be designed correctly.
- Token size can grow.
- Every verifier must implement validation policy correctly.

---

## 11. JWT vs opaque tokens

| Property                         | JWT                   | Opaque token                             |
| -------------------------------- | --------------------- | ---------------------------------------- |
| Human-readable after decoding    | Often                 | No                                       |
| Local validation                 | Often possible        | Usually requires lookup/introspection    |
| Immediate server-side revocation | Harder                | Easier to centralize                     |
| Payload size                     | Can grow              | Small/random                             |
| Distributed validation           | Convenient            | Requires shared validation service/cache |
| Privacy of claims                | Poor unless encrypted | Better by default                        |

Neither is universally superior.

---

## 12. Example validation pseudocode

```text
function validateAccessToken(token):
    parse token

    header = parse header

    assert header.alg is in application_allowed_algorithms

    key = resolveTrustedKey(header.kid)

    assert signature verifies with key and allowed algorithm

    claims = parse payload

    assert claims.iss == EXPECTED_ISSUER
    assert EXPECTED_AUDIENCE is in claims.aud
    assert now < claims.exp

    assert token is the expected token profile/type

    return claims
```

The exact implementation should rely on a well-maintained JOSE/JWT library rather than hand-rolling cryptography.

---

## 13. Key rotation

A production authorization server may publish multiple verification keys:

```text
JWKS
├── key-2026-01  ← current
├── key-2025-04  ← still valid during rollover
└── key-2024-11  ← retiring
```

The token's `kid` can help select the intended key.

Rotation strategy should support:

1. Publishing the new public key.
2. Starting to issue tokens with the new key.
3. Continuing to verify still-valid old tokens during the overlap window.
4. Retiring old keys after the relevant token lifetime and operational safety period.

Authorization server metadata and standardized key publication mechanisms can reduce configuration errors and support cryptographic agility. [RFC 9700](https://www.rfc-editor.org/rfc/rfc9700.html)

---

## 14. Security checklist

Before trusting a JWT:

- [ ] Parse safely.
- [ ] Allow only approved algorithms.
- [ ] Use the correct key type.
- [ ] Verify the signature.
- [ ] Validate expected issuer.
- [ ] Validate expected audience.
- [ ] Validate `exp` / `nbf` according to policy.
- [ ] Check token type/profile when required.
- [ ] Apply scopes/permissions/resource authorization.
- [ ] Keep signing/private keys out of source control.
- [ ] Rotate keys using a controlled process.
- [ ] Avoid logging raw tokens.

---

## 15. Practical lab: inspect a JWT safely

Use only a dummy token in an online decoder or local script. Do **not** paste production credentials.

Node.js example:

```js
const token = process.env.DEMO_JWT;

if (!token) {
  throw new Error("Set DEMO_JWT to a disposable test token");
}

const [header, payload] = token.split(".");

console.log(
  "header:",
  JSON.parse(Buffer.from(header, "base64url").toString("utf8")),
);

console.log(
  "payload:",
  JSON.parse(Buffer.from(payload, "base64url").toString("utf8")),
);
```

Again: this demonstrates **decoding**, not validation.

---

## Knowledge check

1. Why is base64url not encryption?
2. What does a JWT signature protect?
3. Why must the verifier control acceptable algorithms?
4. Why is `aud` important in distributed APIs?
5. What is the difference between an access token and an ID token?
6. Why might an organization choose opaque tokens over JWTs?
7. What happens operationally when signing keys rotate?

### Practical challenge

Create a test JWT profile with:

```json
{
  "iss": "https://auth.local",
  "sub": "user-123",
  "aud": "orders-api",
  "scope": "orders:read",
  "iat": 0,
  "exp": 0
}
```

Then write validation tests for:

- wrong signature
- wrong issuer
- wrong audience
- expired token
- unsupported algorithm
- missing scope

---

## References

- [RFC 7519 — JSON Web Token](https://www.rfc-editor.org/rfc/rfc7519.html)
- [RFC 8725 — JWT Best Current Practices](https://www.rfc-editor.org/rfc/rfc8725.html)
- [RFC 6749 — OAuth 2.0 Authorization Framework](https://www.rfc-editor.org/rfc/rfc6749.html)
- [OpenID Connect Core 1.0](https://openid.net/specs/openid-connect-core-1_0.html)

> **Takeaway:** A JWT is a structured security message. The security comes from a complete validation policy—not from the fact that the token “looks like a JWT.”
