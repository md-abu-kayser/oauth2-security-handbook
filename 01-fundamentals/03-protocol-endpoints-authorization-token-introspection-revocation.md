# 03 — OAuth Protocol Endpoints

> **Handbook standard:** This chapter is written as a practical engineering reference. It separates protocol semantics from implementation choices and highlights security implications.

## Learning objectives

- Explain the protocol concept in precise terminology.
- Trace the relevant HTTP messages and trust boundaries.
- Recognize implementation and security failure modes.
- Apply the concept in production-oriented designs.

## Practical mindset

OAuth is an authorization framework, not a login protocol by itself. Treat tokens as security credentials, minimize privilege, validate inputs at trust boundaries, and prefer current security best practices over legacy interoperability shortcuts.

## 1. Authorization endpoint

Used to obtain resource-owner authorization and, in common flows, an authorization code. It is normally reached through the user agent.

Example request:

```http
GET /authorize?response_type=code&client_id=web-app&redirect_uri=https%3A%2F%2Fapp.example%2Fcallback&scope=read%20write&state=9f1... HTTP/1.1
Host: auth.example.com
```

## 2. Token endpoint

The client exchanges an authorization grant for tokens.

```http
POST /oauth/token HTTP/1.1
Host: auth.example.com
Content-Type: application/x-www-form-urlencoded

grant_type=authorization_code&code=Splxl...&redirect_uri=https%3A%2F%2Fapp.example%2Fcallback&client_id=web-app
```

## 3. Introspection endpoint

A protected resource can query whether a token is active and inspect authorization metadata when the deployment uses opaque or remotely validated tokens.

## 4. Revocation endpoint

A client can tell the authorization server that a previously obtained token should no longer be considered usable.

## 5. Discovery matters

Modern deployments often publish endpoint metadata so clients do not hard-code authorization, token, introspection, or revocation URLs. Use standards-based discovery where supported.

## Common failure modes

- Accepting arbitrary redirect URIs.
- Mixing token endpoint authentication with browser login logic.
- Exposing introspection without authorization.
- Assuming revocation is instantaneous everywhere when downstream caches still exist.

## Standards and references

- [RFC 6749](https://www.rfc-editor.org/rfc/rfc6749.html)
- [RFC 7662 — Token Introspection](https://www.rfc-editor.org/rfc/rfc7662.html)
- [RFC 7009 — Token Revocation](https://www.rfc-editor.org/rfc/rfc7009.html)
- [RFC 8414 — Authorization Server Metadata](https://www.rfc-editor.org/rfc/rfc8414.html)
- [RFC 9700](https://www.rfc-editor.org/rfc/rfc9700.html)

---

**Next:** Continue to the next chapter in this section.
