# 03 — Centralized Logging and Audit

## 1. Observability goal

You should be able to reconstruct:

```text
who
did what
to which resource
through which service
when
what authorization decision occurred
```

without collecting bearer credentials.

## 2. Safe audit event

```json
{
  "event": "authorization.decision",
  "request_id": "req-123",
  "subject": "user-123",
  "service": "orders",
  "scope": "orders:read",
  "decision": "allow"
}
```

## 3. Never log

```text
Access Tokens
Refresh Tokens
client secrets
private keys
PKCE verifiers
session secrets
```

## 4. Trace propagation

Use:

```text
trace_id
request_id
transaction_id
```

through the gateway and downstream calls.

## 5. Security alerts

Monitor for:

```text
invalid token spikes
introspection errors
permission-denied spikes
unusual service identity usage
refresh-token reuse signals
provider outage
```

## 6. Lab

Create a central event stream and dashboard that contains no secrets but can correlate one login or API request across three services.
