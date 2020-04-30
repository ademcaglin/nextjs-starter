import nextConnect from "next-connect";
import auth from "../../middleware/auth";
var crypto = require("crypto");
var challenge = crypto.randomBytes(32).toString('hex');
//import { serializeChallengeCookie } from "../../lib/challenge";
const { Fido2Lib } = require("fido2-lib");
var f2l = new Fido2Lib({
  timeout: 42,
  rpId: process.env.FIDO2_RPID,
  rpName: process.env.FIDO2_RPNAME,
  rpIcon: process.env.FIDO2_RPICON,
  challengeSize: 64,
  attestation: "none",
  cryptoParams: [-7, -257],
  authenticatorAttachment: "platform",
  authenticatorRequireResidentKey: false,
  authenticatorUserVerification: "required"
});
const handler = nextConnect();

handler.use(auth).get(async (req, res) => {
  var registrationOptions = await f2l.assertionOptions();
  registrationOptions.challenge = challenge;
  
  //req.session.isLoggedIn = false
  //const cookieSerialized = await serializeChallengeCookie("12")
  //res.setHeader('Set-Cookie', cookieSerialized)
  //const { username } = req.body;
  // get user_id from endpoint
  // generate challenge
  // {u.id, challenge}
  res.json({ challenge: "d" });
});

export default handler;
