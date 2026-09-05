import express from "express";

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

function extractBearerToken(req) {
  const value = req.get("authorization");
  if (!value || !value.startsWith("Bearer ")) return null;
  return value.slice(7).trim();
}

function requireBearerToken(req, res, next) {
  const token = extractBearerToken(req);

  if (!token) {
    return res.status(401).json({
      error: "unauthorized",
      error_description: "Bearer access token required",
    });
  }

  /*
   * DEMO ONLY:
   * Token presence is NOT token validation.
   * A real resource server must validate signature/introspection result,
   * issuer, audience, expiration and authorization claims.
   */
  req.rawAccessToken = token;
  next();
}

function requireScope(requiredScope) {
  return (req, res, next) => {
    const scopes = req.tokenClaims?.scope?.split(" ") ?? [];

    if (!scopes.includes(requiredScope)) {
      return res.status(403).json({
        error: "insufficient_scope",
        required_scope: requiredScope,
      });
    }

    next();
  };
}

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.get(
  "/api/users",
  requireBearerToken,
  requireScope("users:read"),
  (_req, res) => {
    res.json({
      data: [{ id: "user-1", name: "Example User" }],
    });
  },
);

app.use((err, _req, res, _next) => {
  console.error("request_failed", {
    name: err?.name,
    message: err?.message,
    // Never log tokens, Authorization headers, cookies, or client secrets.
  });

  res.status(500).json({
    error: "internal_server_error",
  });
});

app.listen(PORT, () => {
  console.log(`Demo API listening on http://localhost:${PORT}`);
});
