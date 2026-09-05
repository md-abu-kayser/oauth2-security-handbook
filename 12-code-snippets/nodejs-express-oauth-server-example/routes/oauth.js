import crypto from "node:crypto";
import express from "express";

const router = express.Router();

const clients = new Map([
  [
    "demo-client",
    {
      clientId: "demo-client",
      type: "public",
      redirectUris: ["http://localhost:5173/callback"],
      allowedScopes: ["openid", "profile", "users:read"]
    }
  ]
]);

router.get("/authorize", (req, res) => {
  const client = clients.get(String(req.query.client_id ?? ""));

  if (!client) {
    return res.status(400).json({ error: "unauthorized_client" });
  }

  if (req.query.response_type !== "code") {
    return res.status(400).json({
      error: "unsupported_response_type"
    });
  }

  const redirectUri = String(req.query.redirect_uri ?? "");

  if (!client.redirectUris.includes(redirectUri)) {
    return res.status(400).json({
      error: "invalid_request",
      error_description: "redirect_uri not registered"
    });
  }

  const requestedScopes = String(req.query.scope ?? "")
    .split(" ")
    .filter(Boolean);

  if (requestedScopes.some((scope) => !client.allowedScopes.includes(scope))) {
    return res.status(400).json({ error: "invalid_scope" });
  }

  if (!req.query.code_challenge || req.query.code_challenge_method !== "S256") {
    return res.status(400).json({
      error: "invalid_request",
      error_description: "PKCE S256 is required"
    });
  }

  /*
   * Educational skeleton:
   * A real implementation must authenticate the user, obtain consent,
   * persist a short-lived single-use authorization code, bind it to the
   * client, redirect URI, user, scopes and PKCE challenge, then atomically
   * consume it at the token endpoint.
   */
  const code = crypto.randomBytes(32).toString("base64url");

  const callback = new URL(redirectUri);
  callback.searchParams.set("code", code);

  if (req.query.state) {
    callback.searchParams.set("state", String(req.query.state));
  }

  return res.redirect(callback.toString());
});

router.post("/token", express.urlencoded({ extended: false }), (req, res) => {
  if (req.body.grant_type !== "authorization_code") {
    return res.status(400).json({
      error: "unsupported_grant_type"
    });
  }

  if (
    !req.body.code ||
    !req.body.client_id ||
    !req.body.redirect_uri ||
    !req.body.code_verifier
  ) {
    return res.status(400).json({ error: "invalid_request" });
  }

  return res.status(501).json({
    error: "not_implemented",
    error_description:
      "Use a standards-compliant OAuth/OIDC server for production."
  });
});

export default router;
