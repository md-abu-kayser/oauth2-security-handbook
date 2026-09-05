# 02 — Protecting Endpoints with Scopes

## 1. Permission model

Start with small, explicit scopes:

```text
users:read
users:write
orders:read
orders:write
```

Map each API operation to a scope contract.

## 2. Request pipeline

```text
HTTP request
   ↓
extract credential
   ↓
validate token
   ↓
validate audience
   ↓
check required scope
   ↓
check business/resource authorization
   ↓
controller
```

## 3. 401 vs 403

Use a consistent policy:

```text
No/invalid credential -> 401
Valid credential but insufficient authorization -> 403
```

Do not turn every authorization failure into a generic 500.

## 4. Scope is not ownership

A token with `orders:read` means the caller has the capability represented by that scope. It does not automatically mean the caller may access every order.

Example:

```text
scope = orders:read
resource.owner_id = user-123
subject = user-999
=> deny
```

## 5. Least privilege

If a client only requires:

```text
users:read
```

Do not issue:

```text
users:write orders:read orders:write
```

## 6. Endpoint matrix

| Endpoint | Required scope | Extra rule |
|---|---|---|
| GET /users/me | users:read | subject must match session |
| GET /orders/:id | orders:read | ownership / policy |
| POST /orders | orders:write | tenant/user policy |
| DELETE /users/:id | users:write | privileged business rule |

## 7. Lab

Write tests for:

```text
missing token
invalid token
expired token
wrong audience
missing scope
correct scope + wrong owner
correct scope + correct owner
```
