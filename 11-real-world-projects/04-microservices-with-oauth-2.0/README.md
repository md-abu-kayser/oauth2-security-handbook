# Project 04 — Microservices with OAuth 2.0

## Outcome

Build a gateway plus multiple services and explicitly model end-user identity, service identity, token audiences, delegation, and internal trust boundaries.

## Reference architecture

```text
Client
  ↓
Gateway
  ├──> Orders Service
  │       ↓
  │    Inventory Service
  └──> Profile Service
```

## Key questions

```text
Which service validates the external token?
Do downstream services receive the same token?
When should a token be exchanged/downscoped?
How is service identity authenticated?
Can an external client inject internal identity headers?
```
