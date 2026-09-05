# 03 — Refresh Token Handling

## 1. Why refresh credentials matter

A refresh credential can often obtain new Access Tokens, so compromise can have a larger and longer impact than a short-lived Access Token.

## 2. Rotation

Where supported:

```text
Refresh A
  ↓
Refresh B
  ↓
A becomes invalid
```

Reuse can be treated as a compromise signal.

## 3. Concurrency

Avoid three simultaneous refresh operations:

```text
request A -- refresh --+
request B -- refresh --+--> race
request C -- refresh --+
```

Use a single-flight / mutex strategy:

```text
A -> refresh
B -> wait
C -> wait
        ↓
     new token
```

## 4. Failure handling

For terminal errors such as invalid/revoked refresh credentials:

```text
clear local auth state
end protected session
require re-authentication
```

Do not retry forever.

## 5. Lab

Simulate:

```text
normal refresh
rotated credential
reuse detection
concurrent requests
network timeout
revocation
```
