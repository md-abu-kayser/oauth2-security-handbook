# 02 — API Gateway and Token Introspection

## 1. Gateway role

Potential gateway responsibilities:

```text
TLS
coarse authentication
rate limiting
routing
request correlation
coarse authorization
```

Do not move all domain authorization into the gateway.

## 2. JWT validation

A gateway/resource server may validate:

```text
signature
issuer
audience
expiration
required claims
```

## 3. Introspection

Opaque-token model:

```text
Gateway -> Authorization Server -> introspection response
```

This can centralize token activity status.

## 4. Caching trade-off

Caching improves performance but can delay recognition of revocation. Select cache duration according to security sensitivity and token lifetime.

## 5. Internal trust

If the gateway forwards identity context to services, protect the gateway-to-service boundary. Remove/overwrite untrusted identity headers from inbound traffic.

## 6. Lab

Test:

```text
active token
inactive token
wrong audience
missing scope
introspection timeout
stale cache
```
