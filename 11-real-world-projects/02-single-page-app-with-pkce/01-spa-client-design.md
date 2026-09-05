# 01 — SPA Client Design

## 1. Public client constraint

A deployed SPA cannot keep a long-term client secret confidential. Design the client as a public client and use protocol mechanisms appropriate to public clients.

## 2. Module structure

```text
src/auth/
  authorization.ts
  callback.ts
  pkce.ts
  session.ts
  logout.ts
```

The UI should call an authentication service rather than constructing OAuth URLs itself.

## 3. Transaction state

Store per-login transaction data:

```text
state
nonce (OIDC)
code_verifier
created_at
```

Keep the verifier private to the transaction.

## 4. Direct vs BFF

### Direct

```text
Browser obtains tokens
```

Advantages:

```text
simple deployment
API called directly
```

Risks:

```text
bearer credential exposed to browser runtime
XSS impact can be higher
refresh-token architecture is more sensitive
```

### BFF

```text
Browser -> secure session -> BFF -> provider/API
```

Potential benefits:

```text
server-side token storage
centralized refresh
smaller browser credential surface
```

## 5. Lab

Document why the project chooses Direct or BFF, including threat model, deployment complexity, and user-session requirements.
