# 05 — Observability and Monitoring

Authentication systems need security telemetry. Without it, token theft and provider abuse can be difficult to detect.

## 1. What to observe

Track:

```text
authorization attempts
authorization errors
token endpoint failures
invalid_grant spikes
invalid_client events
PKCE failures
state failures
redirect mismatch failures
token validation failures
scope-denied events
revocation activity
refresh-token reuse indicators
provider latency
provider outages
```

## 2. Never log secrets

Good event:

```json
{
  "event": "oauth.token_exchange_failed",
  "provider": "example-idp",
  "client": "web-app",
  "error": "invalid_grant",
  "request_id": "req-123"
}
```

Bad:

```json
{
  "access_token": "eyJ...",
  "refresh_token": "..."
}
```

## 3. Correlation IDs

Use a request identifier:

```text
request_id
trace_id
transaction_id
```

This lets you connect:

```text
login start
 -> callback
 -> token exchange
 -> API request
```

without logging the credential itself.

## 4. Metrics

Useful metrics:

```text
oauth_authorization_success_total
oauth_authorization_error_total
oauth_token_exchange_success_total
oauth_token_exchange_error_total
oauth_pkce_failure_total
oauth_state_failure_total
oauth_token_validation_failure_total
oauth_refresh_reuse_detected_total
oauth_provider_latency_seconds
```

## 5. Alerting

Alert on anomalies such as:

```text
sudden invalid_grant spike
unexpected issuer failures
PKCE failure surge
token validation failure surge
unusual scope requests
refresh-token reuse
provider outage
```

## 6. Privacy

Do not collect more identity information than required.

Avoid putting:

```text
email
name
access token
refresh token
ID token
```

into generic logs merely because they are available.

## 7. Operational dashboard

A useful OAuth dashboard might show:

```text
Login success rate
Login failure rate
Token exchange latency
Provider error rate
PKCE failures
State failures
Token validation failures
Revocation events
Refresh reuse events
```

## 8. Incident response

When a credential compromise is suspected:

```text
Detect
  ->
identify affected client/user
  ->
revoke/rotate
  ->
invalidate local sessions
  ->
audit access
  ->
monitor
  ->
document
```

## Lab

Build a small monitoring dashboard or log report for your OAuth service.

Requirements:

```text
no secrets
high-cardinality control
request correlation
provider/error dimensions
security alerts
```
