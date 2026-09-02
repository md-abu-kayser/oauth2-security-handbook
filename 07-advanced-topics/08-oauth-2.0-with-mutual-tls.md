# 08 — OAuth 2.0 with Mutual TLS

## 1. Why mTLS exists

Bearer tokens are usable by whoever possesses them.

mTLS can bind an access token to a client certificate, making replay harder because the caller must also
prove possession of the corresponding private key.

RFC 8705 defines mutual-TLS client authentication and certificate-bound access tokens.

## 2. High-level model

```text
Client
  | TLS handshake + client certificate
  v
Authorization Server
  |
  | certificate-bound access token
  v
Resource Server
  |
  | verify certificate binding
  v
Accept / Reject
```

## 3. Two concepts

### Client authentication

The certificate authenticates the client at the token endpoint.

### Certificate-bound access token

The access token itself is associated with the certificate key so another party cannot simply copy the
token and use it without the bound credential.

## 4. Deployment requirements

You need:

```text
PKI
certificate issuance
rotation
revocation
trust anchors
load-balancer handling
certificate forwarding rules
resource-server verification
```

## 5. Reverse proxies

A proxy must not blindly turn an untrusted HTTP header into a trusted client-certificate identity.

The trust boundary must be explicit:

```text
Internet
  ↓
Trusted TLS terminator
  ↓
authenticated metadata channel
  ↓
Resource Server
```

## 6. Trade-offs

| Benefit | Cost |
|---|---|
| Strong sender constraint | PKI operations |
| Strong replay resistance | Certificate lifecycle |
| Good for high-assurance APIs | More complex infrastructure |

## 7. Related mechanism: DPoP

DPoP provides application-layer proof of possession with signed HTTP requests rather than mutual TLS.

Choose based on infrastructure and client capabilities.

## 8. Exercise

Design a certificate lifecycle:

```text
issue → deploy → renew → rotate → revoke → recover
```

and document which system verifies the client certificate.
