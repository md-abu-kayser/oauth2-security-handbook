# Project 05 — Multi-Tenant SaaS Authentication

## Outcome

Build a SaaS identity architecture in which a user, tenant, external IdP, token, and resource are all explicitly bound to the correct security context.

## Reference architecture

```text
Tenant A -> IdP A --+
Tenant B -> IdP B --+--> SaaS Identity Layer --> API / DB
Tenant C -> IdP C --+
```

## Critical invariant

```text
A caller authenticated for Tenant A must not gain Tenant B access
merely by changing a URL, query parameter, or claim supplied by the client.
```

## Acceptance criteria

- Tenant context is authenticated and authorized.
- External identities are keyed by issuer + subject in the tenant context.
- OIDC discovery is performed from trusted tenant configuration.
- Role claims cannot silently grant privileged local roles.
- Cross-tenant test cases are mandatory.
