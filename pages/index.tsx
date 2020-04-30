import React from "react";
import Layout from "../components/Layout";
import { Button } from "@material-ui/core";
import { publicKeyCredentialToJSON } from "../lib/utils";

async function sendWebAuthnAttestationResponse(body: any) {
  let response = await fetch('/api/register', {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });
  if (response.ok) {
    console.log(response);
  }
}

export default function Index() {
  return (
    <Layout>
      Index
      <Button
        onClick={async () => {
          console.log(process.env.FIDO2_RPID);
          const config = {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username: "ademcaglin", displayName: "Adem" })
          };
          const response = await fetch("api/registerrequest", config);
          if (response.ok) {
            const publicKeyCredentialCreationOptions = await response.json();
            console.log(publicKeyCredentialCreationOptions);
            publicKeyCredentialCreationOptions.challenge = Uint8Array.from(
              atob(publicKeyCredentialCreationOptions.challenge), c => c.charCodeAt(0));
            publicKeyCredentialCreationOptions.user.id = Uint8Array.from(
              atob(publicKeyCredentialCreationOptions.user.id), c => c.charCodeAt(0));
            console.log(publicKeyCredentialCreationOptions);
            const credential = await navigator.credentials.create({
              publicKey: publicKeyCredentialCreationOptions
            });
            console.log(publicKeyCredentialToJSON(credential));
            await sendWebAuthnAttestationResponse(publicKeyCredentialToJSON(credential))
          } else {
            console.log(response);
          }
        }}
      >
        Submit
      </Button>
    </Layout>
  );
}
