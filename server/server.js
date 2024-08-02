const express = require("express");
const session = require("express-session");
const dotenv = require("dotenv");
const cors = require("cors");
const { redirectToAuthCodeFlow, getAccessToken } = require("./authPKCE");
const { getProfile, getTopItems } = require("./user");

const PORT = 5000;
dotenv.config({ path: "../.env" });

const spotify_client_id = process.env.SPOTIFY_CLIENT_ID;
const spotify_client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const app = express();

app.use(
  session({
    secret: spotify_client_secret,
    resave: true,
    saveUninitialized: true,
  })
);

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);

app.get("/auth/login", async (req, res) => {
  redirectToAuthCodeFlow(req, res, spotify_client_id);
});

app.get("/auth/callback", async (req, res) => {
  const code = req.query.code;
  if (!code) {
    return res.status(400).send("No code provided");
  }

  try {
    const access_token = await getAccessToken(req, res, spotify_client_id, code);
    let user = await getProfile(access_token);
    req.session.access_token = access_token;
    req.session.user = user;
    res.redirect("/");
  } catch (error) {
    console.error("Error during callback handling: ", error);
    res.status(500).send("Internal server error");
  }
});

app.get("/auth/token", (req, res) => {
  res.json({ access_token: req.session.access_token });
});

app.get("/user", (req, res) => {
  res.json(req.session.user);
});

app.get("/toptracks", async (req, res) => {
  try {
    req.session.top_tracks = await getTopItems(req.session.access_token, "tracks")
    res.json(req.session.top_tracks)
  } catch (error) {
    console.error("Error getting top tracks: ", error)
    res.status(500).send("Internal server error")
  }
})

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});
