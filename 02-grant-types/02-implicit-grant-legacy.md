# 02 — Implicit Grant (Legacy)

> **Handbook standard:** This chapter is written as a practical engineering reference. It separates protocol semantics from implementation choices and highlights security implications.

## Learning objectives

- Explain the protocol concept in precise terminology.
- Trace the relevant HTTP messages and trust boundaries.
- Recognize implementation and security failure modes.
- Apply the concept in production-oriented designs.

## Practical mindset

OAuth is an authorization framework, not a login protocol by itself. Treat tokens as security credentials, minimize privilege, validate inputs at trust boundaries, and prefer current security best practices over legacy interoperability shortcuts.

## What it was

The implicit grant returned an access token directly through the authorization response rather than first returning an authorization code.

## Why it is legacy

The pattern increases exposure of access tokens to the user-agent environment and complicates token leakage and replay defenses. Modern deployments should use authorization code with PKCE instead of building new systems around implicit token delivery.

## Historical shape

```text
/authorize?response_type=token&client_id=spa
        ↓
redirect_uri#access_token=...
```

## Migration path

For browser applications, use Authorization Code + PKCE and an architecture appropriate for browser sessions/tokens. Do not “fix” implicit by adding a client secret to JavaScript; that secret cannot be kept confidential.

> **Legacy compatibility note:** Keep legacy handling isolated, documented, monitored, and scheduled for retirement.

## Standards and references

- [RFC 6749](https://www.rfc-editor.org/rfc/rfc6749.html)
- [RFC 9700](https://www.rfc-editor.org/rfc/rfc9700.html)
- [RFC 7636](https://www.rfc-editor.org/rfc/rfc7636.html)

---

**Next:** Continue to the next chapter in this section.
