# 05 — Device Authorization Grant

> **Handbook standard:** This chapter is written as a practical engineering reference. It separates protocol semantics from implementation choices and highlights security implications.

## Learning objectives

- Explain the protocol concept in precise terminology.
- Trace the relevant HTTP messages and trust boundaries.
- Recognize implementation and security failure modes.
- Apply the concept in production-oriented designs.

## Practical mindset

OAuth is an authorization framework, not a login protocol by itself. Treat tokens as security credentials, minimize privilege, validate inputs at trust boundaries, and prefer current security best practices over legacy interoperability shortcuts.

## Why it exists

Device Authorization is designed for devices with limited input or browser capability, such as TVs, consoles, and hardware terminals.

## User experience

```text
Device → gets device_code + user_code
       → shows verification URI/code
User   → opens verification URI on another device
User   → authenticates + approves
Device → polls token endpoint until authorized
```

## Polling discipline

The client must honor server guidance such as `interval` and back off on authorization-pending responses. Tight polling can cause unnecessary load and rate limiting.

## Security considerations

Display the user code clearly, bind the authorization to the device transaction, expire unused device codes, and avoid logging verification codes.

## Exercise

Design a TV login screen that remains understandable on a 10-foot UI: short code, clear expiry, clear destination, and recovery instructions.

## Standards and references

- [RFC 8628 — OAuth 2.0 Device Authorization Grant](https://www.rfc-editor.org/rfc/rfc8628.html)
- [RFC 9700](https://www.rfc-editor.org/rfc/rfc9700.html)

---

**Next:** Continue to the next chapter in this section.
