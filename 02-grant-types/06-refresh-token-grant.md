# 06 — Refresh Token Grant

> **Handbook standard:** This chapter is written as a practical engineering reference. It separates protocol semantics from implementation choices and highlights security implications.

## Learning objectives

- Explain the protocol concept in precise terminology.
- Trace the relevant HTTP messages and trust boundaries.
- Recognize implementation and security failure modes.
- Apply the concept in production-oriented designs.

## Practical mindset

OAuth is an authorization framework, not a login protocol by itself. Treat tokens as security credentials, minimize privilege, validate inputs at trust boundaries, and prefer current security best practices over legacy interoperability shortcuts.

## Purpose

A refresh token lets a client obtain a new access token without repeating the resource-owner authorization interaction.

```http
POST /oauth/token HTTP/1.1
Host: auth.example.com
Content-Type: application/x-www-form-urlencoded

grant_type=refresh_token&refresh_token=rt_abc123
```

## Rotation and replay

Refresh tokens have long-lived value compared with access tokens. A modern authorization server should use replay-resistant rotation or sender-constraining strategies where appropriate, and invalidate a compromised refresh-token family when reuse is detected.

## Storage

Store refresh tokens in the safest storage available for the client class. Never place them in URLs, source code, logs, analytics payloads, or error messages.

## Incident response

A suspicious refresh-token reuse event should trigger a defined response: revoke/disable the affected credential family as policy permits, record the incident, and require reauthorization when necessary.

## Standards and references

- [RFC 6749](https://www.rfc-editor.org/rfc/rfc6749.html)
- [RFC 9700](https://www.rfc-editor.org/rfc/rfc9700.html)

---

**Next:** Continue to the next chapter in this section.
