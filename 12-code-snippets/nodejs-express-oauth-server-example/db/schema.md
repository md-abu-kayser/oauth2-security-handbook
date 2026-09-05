# Database Schema Notes

## oauth_clients

```text
id
client_id
client_type
redirect_uris
allowed_scopes
token_endpoint_auth_method
created_at
updated_at
disabled_at
```

## authorization_codes

```text
id
code_hash
client_id
user_id
redirect_uri
scope
code_challenge
code_challenge_method
expires_at
consumed_at
created_at
```

Authorization codes are short-lived credentials. Store and consume them safely.

## refresh_tokens

```text
id
token_hash or encrypted_value
client_id
user_id
scope
audience
family_id
expires_at
rotated_at
revoked_at
created_at
```

A token-family model is useful for refresh-token rotation and reuse detection.

## audit_events

```text
id
event_type
request_id
client_id
subject_id
result
created_at
```

Never store bearer tokens or client secrets in normal audit records.
