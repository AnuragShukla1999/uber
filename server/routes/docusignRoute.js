import express from "express";
import { getAccessToken, sendEnvelope } from "../controllers/d.js";
// import { getAccessToken, sendEnvelope } from "../services/docusignService.js";

const router = express.Router();

// Route to authenticate and get access token
router.post("/auth", async (req, res) => {
  const { authCode } = req.body; // Obtain authorization code from client

  console.log("authCode ------> ", authCode);
  try {
    const token = await getAccessToken(authCode);
    res.json({ accessToken: token });
  } catch (error) {
    res.status(500).json({ error: error.message });
    // res.status(500).json({ error: "Failed to get access token" });
  }
});

// Route to send an envelope
router.post("/send-envelope", async (req, res) => {
  const { accessToken } = req.body; // Obtain access token from client
  try {
    const envelopeId = await sendEnvelope(accessToken);
    res.json({ envelopeId });
  } catch (error) {
    res.status(500).json({ error: "Failed to send envelope" });
  }
});

export default router;
