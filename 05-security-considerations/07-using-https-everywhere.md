# 07 — Using HTTPS Everywhere

## 1. TLS is foundational

OAuth authorization responses and token requests carry security-sensitive material. Current OAuth security guidance requires authorization responses not to be sent over unencrypted network connections, with narrow native-app exceptions such as loopback redirection.

## 2. Think in hops

```text
Browser → HTTPS → CDN/LB → proxy → application → provider/API
```

Protect every security-sensitive hop, not just the browser-facing connection.

## 3. TLS termination

If a load balancer terminates TLS, document what protects traffic between the proxy and application. Review trusted proxy headers and certificate validation if internal TLS is used.

## 4. Secure cookies

Use `Secure`, `HttpOnly`, and an appropriate `SameSite` policy for application session cookies.

## 5. Never disable validation casually

Patterns such as:

```text
verify=false
rejectUnauthorized=false
```

should never leak into production configuration.

## 6. HSTS

HSTS can help browsers consistently use HTTPS. Apply it with a deployment policy that accounts for all relevant subdomains and operational constraints.

## 7. Checklist

- HTTPS on public endpoints
- correct certificates
- TLS verification enabled
- secure cookies
- no mixed content
- proxy trust documented
- no plaintext token transport

> **Handbook note**
>
> This chapter is written as an engineering reference. Examples are simplified; validate every security decision against the applicable standards and your system threat model.
