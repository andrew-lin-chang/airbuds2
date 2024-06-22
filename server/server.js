const express = require("express");
const session = require("express-session");
const dotenv = require("dotenv");
const { redirectToAuthCodeFlow, getAccessToken } = require("./authPKCE");
const { access } = require("fs");

const PORT = 5000;
dotenv.config({ path: "../.env" });

const spotify_client_id = process.env.SPOTIFY_CLIENT_ID;
const spotify_client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const app = express();

app.use(
  session({
    secret: spotify_client_secret,
    resave: false,
    saveUninitialized: true,
  })
);

app.get("/auth/login", (req, res) => {
  redirectToAuthCodeFlow(req, res, spotify_client_id);
});

app.get("/auth/callback", async (req, res) => {
  const code = req.query.code;
  if (!code) {
    return res.status(400).send("No code provided");
  }

  try {
    const access_token = await getAccessToken(
      req,
      res,
      spotify_client_id,
      code
    );
    req.session.access_token = access_token;
    const profile = await fetchProfile(access_token);
    req.session.username = profile.display_name;
    res.redirect("/");
  } catch (error) {
    console.error("Error during callback handling: ", error);
    res.status(500).send("Internal server error");
  }
});

app.get("/", (req, res) => {
  if (req.session.username) {
    res.send("Hi, " + req.session.username);
  } else {
    res.send("Connect Spotify account");
  }
});

app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});

async function fetchProfile(code) {
  const result = await fetch("https://api.spotify.com/v1/me", {
    method: "GET",
    headers: { Authorization: `Bearer ${code}` },
  });
  return await result.json();
}
