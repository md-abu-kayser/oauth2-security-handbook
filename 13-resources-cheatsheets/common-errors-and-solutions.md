# Common OAuth/OIDC Errors

## invalid_client

Check client authentication method, client ID, credential, and environment.

## invalid_grant

Common causes:

```text
expired code
reused code
wrong redirect URI
wrong PKCE verifier
revoked refresh token
```

## redirect_uri_mismatch

Compare exact:

```text
scheme
host
port
path
```

## invalid_scope

Check provider-supported scopes and client permissions.

## 401

Usually missing or invalid authentication.

Check:

```text
signature
issuer
audience
expiration
```

## 403

Often valid authentication but insufficient authorization/scope.

## "JWT decoded successfully"

Decode != verify.
