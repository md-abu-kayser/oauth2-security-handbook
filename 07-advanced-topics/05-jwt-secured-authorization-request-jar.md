# 05 — JWT-Secured Authorization Request (JAR)

## 1. Why JAR exists

Normal browser authorization parameters are transported in a way that can be observed and can be
tampered with at the application layer.

JAR (RFC 9101) places the authorization request parameters into a signed JWT, with encryption also
possible when confidentiality is required.

## 2. Request object

Conceptually:

```text
request = signed JWT
             |
             +-- client_id
             +-- response_type
             +-- redirect_uri
             +-- scope
             +-- state
             +-- aud
             +-- iss
```

## 3. Security properties

JAR can provide:

```text
integrity
source authentication
optional confidentiality
```

The authorization server still needs to validate the request object's security properties and policy.

## 4. JAR vs PAR

They solve related but distinct problems:

```text
JAR → protects request parameters as a signed/encrypted object
PAR → moves the request payload to a back-channel endpoint
```

They can be used together.

## 5. Example architecture

```text
Client
  ↓ signed request object
PAR endpoint
  ↓ request_uri
Browser
  ↓
Authorization endpoint
```

This is particularly useful for high-assurance ecosystems.

## 6. Exercise

Define a signed request object policy:

- accepted signing algorithms
- issuer/client binding
- audience
- expiration
- replay protection
- key rotation
