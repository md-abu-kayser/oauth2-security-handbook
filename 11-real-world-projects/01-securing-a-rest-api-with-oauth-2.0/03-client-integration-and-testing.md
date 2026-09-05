# 03 — Client Integration and Testing

## 1. Client architecture

Keep OAuth logic behind an explicit service boundary:

```text
UI / Controller
      ↓
OAuth Client Service
      ↓
Authorization Server
```

Do not scatter callback and token code across controllers.

## 2. Login transaction

```text
create state
create PKCE verifier
create challenge
store pending transaction
redirect user
receive callback
validate state
exchange code
validate tokens
create local session
```

## 3. Unit tests

Test deterministic helpers:

```text
state comparison
PKCE derivation
scope parsing
redirect URI validation
claim validation
error mapping
```

## 4. Integration tests

Exercise the real application against a test Authorization Server:

```text
/start-login
/callback
/token
/api/orders
/logout
```

## 5. Security regression tests

At minimum:

```text
state substitution
wrong PKCE verifier
code replay
wrong issuer
wrong audience
expired token
insufficient scope
```

## 6. Safe error handling

Public response:

```text
Authentication could not be completed. Request ID: req-123
```

Internal event:

```json
{
  "error": "invalid_grant",
  "request_id": "req-123"
}
```

Never expose token values or stack traces.

## 7. Lab

Create a test report containing:

```text
scenario
request
expected security decision
actual result
regression test name
```
