# 02 — Identity Federation with OIDC

## 1. Tenant-specific providers

```text
Tenant A -> issuer-A
Tenant B -> issuer-B
Tenant C -> issuer-C
```

Each tenant configuration should explicitly identify which issuer is trusted.

## 2. Tenant provider record

Conceptual fields:

```text
tenant_id
issuer
client_id
redirect_uri
scopes
allowed algorithms
metadata cache policy
secret reference
```

## 3. Discovery

```text
trusted issuer
   ↓
OIDC discovery
   ↓
authorization endpoint
token endpoint
UserInfo
JWKS
```

Validate the metadata issuer against the tenant's configured issuer.

## 4. External identity key

Do not use email as the sole identity key. A safer conceptual identity is:

```text
tenant_id + issuer + sub
```

## 5. JIT provisioning

First login can become:

```text
validate OIDC response
   ↓
resolve tenant
   ↓
create/find external identity
   ↓
create/find local membership
   ↓
apply default role
   ↓
create local session
```

Do not grant privileged local roles merely because an arbitrary external claim says `admin`. Use an explicit role-mapping policy.

## 6. Tenant onboarding

Document:

```text
issuer verification
client registration
redirect URI
secret provisioning
role mapping
key rotation
offboarding
```

## 7. Testing

Must fail:

```text
wrong tenant
wrong issuer
wrong audience
unknown subject
malicious role claim
provider key rotation mismatch
```

## Capstone

Onboard two mock OIDC providers and demonstrate that a successful authentication at Provider A cannot create or access a Tenant B session.
