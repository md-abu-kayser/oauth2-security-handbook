# 03 — Rich Authorization Requests (RAR)

## 1. Why RAR exists

Traditional OAuth scopes can become too coarse for complex authorization.

For example:

```text
scope=payment
```

does not express:

```text
amount = 2500
currency = USD
merchant = X
```

RAR (RFC 9396) provides structured authorization details.

## 2. Concept

Instead of flattening rich policy into many scope names:

```json
{
  "authorization_details": [
    {
      "type": "payment_initiation",
      "actions": ["initiate"],
      "locations": ["https://api.example.com/payments"],
      "instructedAmount": {
        "currency": "USD",
        "amount": "2500"
      }
    }
  ]
}
```

The exact object type is application/ecosystem-specific.

## 3. Architecture

```text
Client
  ↓
Structured authorization details
  ↓
Authorization Server
  ↓
User consent + policy
  ↓
Token with appropriate authorization context
  ↓
Resource Server
```

## 4. Scope vs RAR

| Scope | RAR |
|---|---|
| Compact permission label | Structured authorization details |
| Good for broad capabilities | Good for transaction-specific consent |
| Easy to cache/reason about | More expressive |
| Can become scope explosion | Can increase validation complexity |

RAR is not a replacement for all scopes.

## 5. Security

Validate each structured field:

```text
type
actions
locations
amount
currency
resource
time constraints
tenant
```

Never treat the JSON object as trusted merely because it came from your own frontend.

## 6. Exercise

Design an authorization detail type for:

```text
bank transfer
amount
currency
destination
execution date
```

List which fields are user-visible and which are server-derived.
