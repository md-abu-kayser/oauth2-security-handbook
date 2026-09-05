# 04 — Deployment and Hardening

## 1. Production topology

```text
Internet
   ↓
TLS / Reverse Proxy
   ↓
+--------------------+
| Auth Server | API  |
+--------------------+
          ↓
       Database
```

For larger systems, separate the Authorization Server and API into independent services and trust domains.

## 2. Key management

Signing keys require a lifecycle:

```text
generate → publish verification key → sign → rotate → retire
```

Support `kid`-based key selection and controlled overlap during rotation.

## 3. Secrets

Use a secret manager for:

```text
client credentials
database credentials
encryption keys
private signing keys
```

Never commit or print them.

## 4. Operational controls

Add:

```text
rate limiting
connection limits
timeouts
health checks
structured audit logs
monitoring
backup / recovery
incident response
```

## 5. Hardening checklist

```text
[ ] HTTPS everywhere in production
[ ] exact redirect URI policy
[ ] PKCE enforcement
[ ] short-lived codes
[ ] audience validation
[ ] algorithm allow-list
[ ] secure key rotation
[ ] no secrets in logs
[ ] rate limits
[ ] database access controls
[ ] security regression suite
[ ] rollback plan
```

## Capstone

Deploy to a staging environment and perform a threat-model review before treating the implementation as production-ready.
