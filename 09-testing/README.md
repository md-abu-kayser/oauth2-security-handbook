# 09 — Testing OAuth Components

OAuth security bugs often survive because teams test only the successful login path.

This section treats authentication as a security-sensitive distributed system that requires unit, integration, negative, security, and CI testing.

## Chapters

| Chapter | Focus                                    |
| ------- | ---------------------------------------- |
| 01      | Unit testing OAuth logic                 |
| 02      | Integration tests with mock servers      |
| 03      | Security testing and penetration testing |
| 04      | Postman and OAuth test tools             |
| 05      | CI/CD for OAuth components               |

## Test pyramid

```text
                 E2E / real providers
                       /                      /                 Integration tests
                    /                   Unit + contract
                  /                     static/security
```

## Minimum security regression suite

```text
state mismatch
PKCE mismatch
redirect mismatch
expired code
code replay
wrong issuer
wrong audience
invalid signature
expired token
insufficient scope
revoked credential
secret leakage
```
