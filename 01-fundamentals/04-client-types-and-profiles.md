# 04 — Client Types and Profiles

> **Handbook standard:** This chapter is written as a practical engineering reference. It separates protocol semantics from implementation choices and highlights security implications.

## Learning objectives

- Explain the protocol concept in precise terminology.
- Trace the relevant HTTP messages and trust boundaries.
- Recognize implementation and security failure modes.
- Apply the concept in production-oriented designs.

## Practical mindset

OAuth is an authorization framework, not a login protocol by itself. Treat tokens as security credentials, minimize privilege, validate inputs at trust boundaries, and prefer current security best practices over legacy interoperability shortcuts.

## 1. Confidential vs public clients

A **confidential client** can keep credentials confidential in its execution environment, such as a traditional backend service. A **public client** cannot reliably keep a credential secret, such as a native app distributed to users or browser-based code.

> **Security rule:** A client secret shipped inside browser or mobile application code is not a meaningful secret against the user of that application.

## 2. Common profiles

| Profile             | Secret storage | Typical pattern                                      |
| ------------------- | -------------- | ---------------------------------------------------- |
| Server-side web app | Server-side    | Authorization Code + client authentication           |
| SPA                 | Public         | Authorization Code + PKCE                            |
| Native mobile       | Public         | Authorization Code + PKCE + claimed HTTPS/app links  |
| Machine-to-machine  | Depends        | Client Credentials or stronger client authentication |

## 3. Client authentication is not user authentication

`client_id` identifies the application registration. Client authentication proves control of a credential associated with that application. User authentication occurs separately at the authorization server.

## 4. Registration checklist

Record exact redirect URIs, allowed grant types, client authentication method, allowed scopes, token endpoint authentication method, and environment ownership. Avoid wildcard redirects unless the protocol provider explicitly supports a secure constrained pattern.

## Standards and references

- [RFC 6749](https://www.rfc-editor.org/rfc/rfc6749.html)
- [RFC 8252 — OAuth 2.0 for Native Apps](https://www.rfc-editor.org/rfc/rfc8252.html)
- [RFC 9700](https://www.rfc-editor.org/rfc/rfc9700.html)

---

**Next:** Continue to the next chapter in this section.
