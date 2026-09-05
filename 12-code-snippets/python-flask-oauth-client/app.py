import base64
import hashlib
import os
import secrets
from urllib.parse import urlencode

import requests
from flask import Flask, abort, redirect, request, session

app = Flask(__name__)
app.secret_key = os.environ["FLASK_SECRET_KEY"]

AUTHORIZE_URL = os.environ["OAUTH_AUTHORIZE_URL"]
TOKEN_URL = os.environ["OAUTH_TOKEN_URL"]
CLIENT_ID = os.environ["OAUTH_CLIENT_ID"]
REDIRECT_URI = os.environ["OAUTH_REDIRECT_URI"]


def b64url(data: bytes) -> str:
    return base64.urlsafe_b64encode(data).rstrip(b"=").decode("ascii")


def create_pkce_pair():
    verifier = secrets.token_urlsafe(32)
    digest = hashlib.sha256(verifier.encode("ascii")).digest()
    return verifier, b64url(digest)


@app.get("/login")
def login():
    state = secrets.token_urlsafe(32)
    verifier, challenge = create_pkce_pair()

    session["oauth_state"] = state
    session["pkce_verifier"] = verifier

    params = {
        "client_id": CLIENT_ID,
        "redirect_uri": REDIRECT_URI,
        "response_type": "code",
        "scope": "openid profile email",
        "state": state,
        "code_challenge": challenge,
        "code_challenge_method": "S256",
    }

    return redirect(f"{AUTHORIZE_URL}?{urlencode(params)}")


@app.get("/callback")
def callback():
    if request.args.get("error"):
        abort(400, description="Authorization was not completed")

    expected_state = session.pop("oauth_state", None)
    returned_state = request.args.get("state")

    if not returned_state or returned_state != expected_state:
        abort(400, description="Invalid state")

    code = request.args.get("code")
    verifier = session.pop("pkce_verifier", None)

    if not code or not verifier:
        abort(400, description="Incomplete callback")

    response = requests.post(
        TOKEN_URL,
        data={
            "grant_type": "authorization_code",
            "client_id": CLIENT_ID,
            "code": code,
            "redirect_uri": REDIRECT_URI,
            "code_verifier": verifier,
        },
        timeout=10,
    )

    response.raise_for_status()
    token_set = response.json()

    # OIDC production code must validate ID Token signature, issuer,
    # audience, expiration, nonce and other required claims.
    # Access Tokens must be validated according to the target API contract.

    session["authenticated"] = True

    # Never put access/refresh tokens into URLs or logs.
    return redirect("/")


@app.get("/")
def home():
    return {"authenticated": bool(session.get("authenticated"))}


if __name__ == "__main__":
    app.run(debug=True)
