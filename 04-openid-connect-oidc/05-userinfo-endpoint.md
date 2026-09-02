# 05 — UserInfo Endpoint

## 1. Purpose

The UserInfo Endpoint is an OAuth 2.0 protected resource that returns claims about the authenticated end-user.

```http
GET /userinfo
Authorization: Bearer ACCESS_TOKEN
```

Example:

```json
{
  "sub": "248289761001",
  "name": "Ada Lovelace",
  "email": "ada@example.com",
  "email_verified": true
}
```

## 2. Access Token, not ID Token

UserInfo is called using an Access Token. The ID Token is an authentication assertion for the RP; it is not a general-purpose bearer credential for protected resources.

## 3. Subject consistency

When ID Token and UserInfo both provide `sub`, the RP should ensure they identify the same OIDC subject under the protocol's rules.

```text
ID Token sub = X
UserInfo sub = X  ✅
ID Token sub = X
UserInfo sub = Y  ❌
```

## 4. Scope and claim minimization

Typical scopes include `openid`, `profile`, and `email`. Request only what the application actually needs. This improves privacy and reduces unnecessary data exposure.

## 5. Error handling

Your client should distinguish authentication failure, authorization failure, throttling, and provider outages rather than retrying everything indefinitely.

```text
401 → invalid/missing credential
403 → insufficient authorization
429 → rate limit
5xx → upstream failure
```

## 6. Secret handling

Never place access tokens in URLs or ordinary logs. Use HTTPS and protect the token according to its lifetime and sensitivity.

## 7. UserInfo vs ID Token

| Property      | ID Token                 | UserInfo                    |
| ------------- | ------------------------ | --------------------------- |
| Primary role  | Authentication assertion | Protected identity resource |
| Format        | JWT                      | JSON response               |
| Credential    | Consumed by RP           | Access Token                |
| Update timing | Issuance time            | Request time                |

## 8. Exercise

Implement a UserInfo client with timeouts, TLS verification, redacted logs, structured error handling, and a `sub` consistency check. Add tests for 401, 403, 429, malformed JSON, and subject mismatch.

> **Handbook note**
>
> This chapter is written as an engineering reference. Examples are simplified; validate every security decision against the applicable standards and your system threat model.
