# 07 — OAuth 2.0 for SPA / Browser-Based Apps

## 1. Browser clients are constrained

A SPA cannot keep a long-term client secret confidential.

Modern guidance favors:

```text
Authorization Code + PKCE
```

and careful browser-session design.

## 2. Two common architectures

### Pure SPA

```text
Browser
  ↓
OAuth provider
  ↓
Browser
  ↓
API
```

The browser handles more credential material.

### BFF

```text
Browser
  ↓ session cookie
BFF
  ↓ OAuth token
Provider / API
```

A BFF can reduce exposure of OAuth tokens to browser JavaScript.

## 3. XSS reality

No storage mechanism eliminates XSS.

If malicious JavaScript executes in the application's origin, it may be able to perform actions as the user
even when tokens are not directly readable.

Therefore combine:

```text
CSP
output encoding
dependency hygiene
short credential lifetimes
secure cookies
same-origin design
CSRF protections
```

## 4. Browser storage choices

Do not choose storage based on convenience alone.

Evaluate:

```text
localStorage
sessionStorage
in-memory
secure cookie + BFF
```

against XSS, CSRF, refresh behavior, multi-tab coordination, and UX requirements.

## 5. CSRF and cookies

If using cookie-backed sessions, cross-site request behavior must be designed intentionally.

Use appropriate:

```text
SameSite
CSRF tokens where required
Origin checks
state
```

## 6. Token leakage

Avoid placing tokens in URLs or fragment-based legacy designs for new deployments.

## 7. Exercise

Compare pure SPA and BFF architectures using a threat matrix:

```text
XSS
CSRF
token theft
refresh token exposure
multi-tab session
operational complexity
deployment cost
```

Choose one and justify it.
