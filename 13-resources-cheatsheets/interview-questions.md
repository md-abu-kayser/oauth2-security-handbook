# OAuth 2.0 & OIDC Interview Questions

## Fundamentals

1. What problem does OAuth 2.0 solve?
2. Authentication vs authorization?
3. What is an Access Token?
4. What is a refresh token?
5. What is scope?

## Security

6. Why does PKCE exist?
7. What does state protect?
8. What does OIDC nonce protect?
9. Why validate issuer?
10. Why validate audience?
11. Why avoid open redirects?
12. Why is an ID Token not a generic API credential?

## Architecture

13. SPA direct OAuth vs BFF?
14. JWT vs opaque token?
15. Introspection vs local JWT validation?
16. How do you rotate signing keys?
17. How do you handle refresh-token reuse?
18. How do you isolate tenants?

## Scenario

An OIDC login succeeds but the API returns 401. Explain a diagnostic sequence:

```text
check Access Token
-> signature
-> issuer
-> audience
-> expiration
-> scope
-> API configuration
-> clock/environment mismatch
```
