# 02 — Using App Links and Deep Links

## 1. Redirect choices

A native app may use platform-specific mechanisms such as:

```text
claimed HTTPS app links / universal links
custom URI schemes
other provider/platform-supported redirect mechanisms
```

Choose based on provider support and platform security properties.

## 2. Interception threat

```text
Provider
   ↓ authorization code
Malicious application
```

PKCE limits the value of a stolen authorization code, but correct redirect registration and platform association remain essential.

## 3. Validate callback

Check:

```text
scheme / host / path
state
code presence
provider error
expected transaction
```

Do not open arbitrary navigation URLs from callback parameters.

## 4. Lab

Create tests for:

```text
correct link
wrong host
wrong path
unexpected parameter
state mismatch
replayed code
```
