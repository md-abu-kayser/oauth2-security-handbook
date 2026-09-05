# 02 — Choosing the Right Grant / Flow

Choosing an OAuth flow should follow the client architecture and security requirements, not a tutorial's age.

## 1. Decision table

| Scenario                      | Typical choice            |
| ----------------------------- | ------------------------- |
| Server-side web app           | Authorization Code        |
| SPA                           | Authorization Code + PKCE |
| Native/mobile app             | Authorization Code + PKCE |
| Machine-to-machine            | Client Credentials        |
| Input-constrained device      | Device Authorization      |
| Legacy flow found in old code | Review and migrate        |
| Password grant                | Avoid for new designs     |

## 2. Server-side web

A confidential server can protect client authentication credentials.

```text
Browser
  |
  v
Server / RP
  |
  +--> Authorization Code
  +--> token exchange
```

## 3. SPA

Browser code cannot safely keep a long-term client secret.

Prefer:

```text
Authorization Code + PKCE
```

## 4. Native application

Public clients use:

```text
Authorization Code + PKCE
```

and platform-approved external user-agent / redirect mechanisms.

## 5. Machine-to-machine

When there is no end-user authorization:

```text
service -> Authorization Server
```

Client Credentials can be appropriate.

This flow should still use:

```text
narrow scope
restricted audience
secure credential storage
credential rotation
```

## 6. Device Authorization

For constrained devices:

```text
Device
  |
  | device code
  v
User's browser/phone
  |
  v
Authorization
```

The device then polls according to provider-defined intervals.

## 7. Legacy grants

Do not select:

```text
Implicit
Resource Owner Password Credentials
```

for new designs merely because they are listed in an old article.

RFC 9700 deprecates less-secure OAuth modes and provides current best-practice guidance. citeturn143287search0turn143287search2

## 8. Decision questions

```text
Can the client keep a secret?
Is a user involved?
Does the client have a browser?
Can it use PKCE?
Is the target resource an API?
Is user interaction constrained?
Is a legacy provider forcing a special mode?
```

## Lab

For each application below, select a flow and justify it:

```text
React SPA
Express web app
iOS app
CLI
IoT TV device
backend worker
```
