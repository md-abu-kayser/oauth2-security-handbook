# 03 — Resource Owner Password Credentials Grant (Legacy)

> **Handbook standard:** This chapter is written as a practical engineering reference. It separates protocol semantics from implementation choices and highlights security implications.

## Learning objectives

- Explain the protocol concept in precise terminology.
- Trace the relevant HTTP messages and trust boundaries.
- Recognize implementation and security failure modes.
- Apply the concept in production-oriented designs.

## Practical mindset

OAuth is an authorization framework, not a login protocol by itself. Treat tokens as security credentials, minimize privilege, validate inputs at trust boundaries, and prefer current security best practices over legacy interoperability shortcuts.

## What it did

The client collected the resource owner's username/password and exchanged those credentials directly for an OAuth access token.

## Why it is legacy

It requires the client to handle user credentials, expanding the credential attack surface and weakening separation between the client and authorization server. It also interferes with modern authentication methods and federation.

## Historical request

```http
POST /token
Content-Type: application/x-www-form-urlencoded

grant_type=password&username=alice&password=secret&scope=read
```

## Modern replacement

Use a browser-based authorization flow in which the authorization server owns user authentication, preferably authorization code + PKCE for public clients.

## Migration checklist

- Stop collecting user passwords in third-party applications.
- Register clients with precise redirect URIs.
- Adopt PKCE.
- Provide user consent and modern authentication at the authorization server.
- Remove the old grant after telemetry shows zero legitimate use.

## Standards and references

- [RFC 6749](https://www.rfc-editor.org/rfc/rfc6749.html)
- [RFC 9700](https://www.rfc-editor.org/rfc/rfc9700.html)

---

**Next:** Continue to the next chapter in this section.
