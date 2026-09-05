# 04 — API Gateway and OAuth

An API Gateway can centralize cross-cutting security controls, but it should not become a blind token passthrough.

## 1. Gateway architecture

```text
Client
  |
  v
+----------------+
| API Gateway    |
| TLS            |
| Rate limit     |
| Token validate |
+-------+--------+
        |
        v
+----------------+
| Service A      |
+----------------+

+----------------+
| Service B      |
+----------------+
```

## 2. What the gateway can do

Potential responsibilities:

```text
TLS termination
authentication
JWT validation
introspection
rate limiting
routing
audit metadata
request correlation
```

## 3. What services still need

Downstream services should still enforce authorization appropriate to their domain.

Do not rely on:

```text
gateway says user is admin
```

without defining and protecting the trust boundary.

## 4. Audience validation

A gateway should know which token audiences it accepts.

A service should also ensure it does not accept credentials intended for another security domain when that matters to the architecture.

## 5. Token propagation

Two common models:

### Propagate end-user token

```text
Gateway -> Service
Bearer token
```

### Exchange / downscope

```text
Incoming credential
      |
      v
Token Exchange
      |
      v
Service-specific token
```

Token Exchange can provide better least-privilege boundaries in more complex architectures.

## 6. Centralized introspection

For opaque tokens:

```text
Gateway -> Authorization Server
           introspection
```

Cache carefully. A long cache can undermine immediate revocation expectations.

## 7. Rate limiting

Protect:

```text
/authorize
/token
/introspect
/revoke
API routes
```

Rate limits should account for legitimate authorization bursts while preventing abuse.

## 8. Lab

Design a gateway policy:

```text
validate token
check audience
check scope
rate limit
add request-id
forward only required headers
```

Then test malformed and over-privileged tokens.
