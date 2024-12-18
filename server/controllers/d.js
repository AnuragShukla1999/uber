import axios from "axios";
import docusign from "docusign-esign";
import dotenv from "dotenv";

import qs from "querystring";

dotenv.config(); // Load environment variables

const { DOCUSIGN_CLIENT_ID, DOCUSIGN_CLIENT_SECRET, DOCUSIGN_REDIRECT_URI, DOCUSIGN_ACCOUNT_ID } = process.env;

// console.log(process.env.DOCUSIGN_CLIENT_ID);


export async function getAccessToken(authCode) {
  const url = "https://account-d.docusign.com/oauth/token";

  // const data = {
  //   grant_type: "authorization_code",
  //   code: authCode,
  //   client_id: DOCUSIGN_CLIENT_ID,
  //   client_secret: DOCUSIGN_CLIENT_SECRET,
  //   redirect_uri: DOCUSIGN_REDIRECT_URI,
  // };

  const data = qs.stringify({
    grant_type: "authorization_code",
    code: authCode,
    client_id: process.env.DOCUSIGN_CLIENT_ID,
    client_secret: process.env.DOCUSIGN_CLIENT_SECRET,
    redirect_uri: process.env.DOCUSIGN_REDIRECT_URI,
  });

  try {
    const response = await axios.post(url, data, {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });
    return response.data.access_token;
  } catch (error) {
    console.error("Error fetching access token:", error.response?.data || error);
    throw error;
  }
}

export async function sendEnvelope(accessToken) {
  const apiClient = new docusign.ApiClient();
  apiClient.setBasePath("https://demo.docusign.net/restapi");
  apiClient.addDefaultHeader("Authorization", `Bearer ${accessToken}`);

  const envelopesApi = new docusign.EnvelopesApi(apiClient);

  const envelopeDefinition = new docusign.EnvelopeDefinition();
  envelopeDefinition.emailSubject = "Please sign this document";
  envelopeDefinition.status = "sent";

  const doc1 = new docusign.Document();
  doc1.documentBase64 = Buffer.from("This is a test document.").toString("base64");
  doc1.name = "Sample Document";
  doc1.fileExtension = "txt";
  doc1.documentId = "1";

  envelopeDefinition.documents = [doc1];

  const signer = new docusign.Signer();
  signer.email = "signer@example.com";
  signer.name = "Signer Name";
  signer.recipientId = "1";

  const signHere = new docusign.SignHere();
  signHere.anchorString = "/sn1/";
  signHere.anchorYOffset = "10";
  signHere.anchorUnits = "pixels";
  signHere.anchorXOffset = "20";

  signer.tabs = new docusign.Tabs();
  signer.tabs.signHereTabs = [signHere];

  envelopeDefinition.recipients = new docusign.Recipients();
  envelopeDefinition.recipients.signers = [signer];

  try {
    const results = await envelopesApi.createEnvelope(DOCUSIGN_ACCOUNT_ID, {
      envelopeDefinition,
    });
    return results.envelopeId;
  } catch (error) {
    console.error("Error creating envelope:", error.response?.data || error);
    throw error;
  }
}
