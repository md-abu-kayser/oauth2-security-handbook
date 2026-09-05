# 01 — Tenant-Aware Tokens and Claims

## 1. Example claim model

```json
{
  "iss": "https://auth.example.com",
  "sub": "user-123",
  "aud": "https://api.example.com",
  "tenant_id": "tenant-456",
  "scope": "orders:read",
  "iat": 1778000000,
  "exp": 1778000900
}
```

Document every tenant-related claim and its trust source.

## 2. Authorization pipeline

```text
validate token
   ↓
issuer
   ↓
audience
   ↓
resolve tenant context
   ↓
check membership
   ↓
check scope / role
   ↓
check resource policy
```

## 3. Cross-tenant attack

If the user belongs to `tenant-a`, this must not be sufficient:

```text
GET /tenants/tenant-b/orders
```

The authorization layer must compare URL/resource context with authenticated tenant membership.

## 4. Database isolation

Common patterns:

```text
shared tables + tenant_id
separate schema per tenant
separate database per tenant
```

Select based on isolation, cost, operations, and regulatory needs.

## 5. Defense in depth

Apply tenant constraints in:

```text
application authorization
query/repository layer
database controls where appropriate
audit logging
```

## 6. Lab

Create two tenants and ensure every tenant-sensitive endpoint passes a cross-tenant denial test.
