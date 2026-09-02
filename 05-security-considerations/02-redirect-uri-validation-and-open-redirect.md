# 02 — Redirect URI Validation and Open Redirect

## 1. Redirect URI as a security boundary

The authorization server redirects the user agent to this location with a security-sensitive response. A weak validation rule can therefore redirect an authorization code toward an attacker.

## 2. Prefer exact registration

```text
registered:
https://app.example.com/oauth/callback

expected:
https://app.example.com/oauth/callback ✅

near-match:
https://app.example.com.evil.example/callback ❌
```

Do not use casual substring, prefix, suffix, or overly broad regex checks.

## 3. Dangerous patterns

```js
url.startsWith("https://app.example.com");
url.includes("example.com");
url.endsWith("/callback");
```

These examples are intentionally simplistic, but they illustrate why naive matching can be dangerous.

## 4. Open redirectors

An endpoint such as:

```text
GET /redirect?url=https://attacker.example
```

can become an attack primitive when combined with authentication and OAuth flows. Avoid arbitrary forwarding; use an allow-list of known destinations.

## 5. Validation checklist

1. Parse the URI.
2. Compare against registered redirect values using protocol-defined matching.
3. Reject unexpected scheme, host, port, or path.
4. Do not silently repair malformed input.
5. Keep production registrations separate from development registrations.
6. Do not log authorization codes while debugging.

## 6. Negative tests

Test host confusion, alternate ports, encoded separators, path traversal, unexpected query/fragment components, and look-alike domains.

## 7. Native applications

Native apps have distinct redirect mechanisms, including claimed HTTPS links and loopback interfaces. Apply RFC 8252 guidance rather than copying web redirect assumptions.

> **Handbook note**
>
> This chapter is written as an engineering reference. Examples are simplified; validate every security decision against the applicable standards and your system threat model.
