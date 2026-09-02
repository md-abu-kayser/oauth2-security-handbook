# 06 — OAuth 2.0 for Native Apps and Mobile

## 1. Native apps are public clients

A native application cannot safely assume that an embedded static secret remains confidential.

Use external user-agents, especially the system browser, for authorization. RFC 8252 documents native
application best practices.

## 2. Recommended flow

```text
Mobile App
   ↓
System Browser
   ↓
Authorization Server
   ↓
Redirect to app
   ↓
Authorization Code
   ↓
Token Endpoint + PKCE
```

## 3. Redirect mechanisms

Common approaches include:

- claimed HTTPS app links
- universal links / associated domains
- loopback redirects where appropriate
- custom schemes with platform-specific collision considerations

The preferred mechanism depends on platform capabilities and deployment.

## 4. PKCE

Native clients should use Authorization Code + PKCE.

The authorization code alone is not sufficient protection against interception.

## 5. Deep-link security

Validate:

- expected scheme
- host
- path
- application association
- state
- PKCE verifier

Do not treat arbitrary deep-link input as trusted authentication state.

## 6. Token storage

Use platform-provided secure credential storage where possible.

Do not casually store refresh tokens in plaintext files, general preferences, or logs.

## 7. Exercise

Design an Android/iOS login sequence using:

```text
system browser
authorization code
PKCE
claimed HTTPS redirect
secure refresh-token storage
```

Include the threat of another application attempting to claim the redirect.
