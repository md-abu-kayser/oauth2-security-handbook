# 02 — Integration Testing with Mock Servers

Integration tests verify that your components agree on protocol details: URL construction, HTTP methods, form encoding, headers, token parsing, and error mapping.

## 1. Mock provider architecture

```text
Test App
   |
   +----> Mock Authorization Server
   |
   +----> Mock Token Endpoint
   |
   +----> Mock UserInfo
   |
   +----> Mock JWKS
```

## 2. Test the full code flow

```text
/start-login
     |
     v
mock /authorize
     |
     v
/callback?code=...
     |
     v
mock /token
     |
     v
tokens
     |
     v
mock /userinfo
```

## 3. Mock scenarios

Create deterministic scenarios:

```text
success
access_denied
invalid_request
invalid_grant
invalid_client
expired_code
wrong redirect_uri
wrong code_verifier
token endpoint timeout
malformed JSON
JWKS key rotation
UserInfo 401
UserInfo 429
```

## 4. Contract tests

Verify your implementation against the expected protocol contract:

```text
method
path
content-type
required parameters
header
status
response schema
error schema
```

## 5. Do not make tests too realistic

A mock should focus on the protocol behavior you want to verify.

Bad:

```text
random provider simulator
```

Better:

```text
deterministic protocol fixtures
```

## 6. Test time

OAuth systems are time-sensitive. Inject a clock:

```js
const clock = {
  now: () => fixedTimestamp
};
```

Then test:

```text
not expired
exact expiration
expired
clock skew
```

## 7. Test replay

A mock authorization server should reject:

```text
same authorization code used twice
```

Your client tests should verify the failure is handled correctly.

## 8. Lab

Build a local test server that exposes:

```text
GET  /authorize
POST /token
GET  /userinfo
GET  /.well-known/jwks.json
```

Then run your application entirely against it in CI.
