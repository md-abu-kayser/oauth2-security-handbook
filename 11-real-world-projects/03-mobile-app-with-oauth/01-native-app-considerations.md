# 01 — Native App Considerations

## 1. Public client model

A mobile binary is distributed to users, so a static client secret embedded in the application cannot be treated like a confidential server credential.

## 2. Preferred flow

```text
Authorization Code + PKCE
```

Use the platform's supported browser/user-agent integration rather than designing an insecure embedded login surface.

## 3. Architecture

```text
Mobile App
   ↓
System Browser / User Agent
   ↓
Authorization Server
   ↓
Registered Redirect
   ↓
Mobile App
   ↓
Token Endpoint
```

## 4. Local storage

Protect long-lived credentials with the platform's secure credential facility. Treat refresh credentials as high-value secrets.

## 5. Lifecycle

Handle:

```text
app background
process death
network loss
clock changes
token expiration
account logout
```

## 6. Lab

Write a platform-neutral design document and explicitly identify which parts are implemented by Android/iOS platform security rather than by your app.
