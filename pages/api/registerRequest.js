import nextConnect from "next-connect";
import auth from "../../middleware/auth";
import {
    addNewUser,
    getUserById,
    getUserByName
} from "../../lib/userRepository";
const crypto = require("crypto");
const { Fido2Lib } = require("fido2-lib");

var f2l = new Fido2Lib({
    timeout: 60000,
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

handler.use(auth).post(async (req, res) => {
    
    const { username, displayName } = req.body;
    //let user = await getUserByName(req.body.username);
    //if (user) return res.json({ status: "exist" });
    let registerChallenge = crypto.randomBytes(32).toString('base64');
    let userId = crypto.randomBytes(32).toString('base64');
    req.session.username = username;
    req.session.userId = userId;
    req.session.displayname = displayName;
    req.session.registerChallenge = registerChallenge;
    req.session.registerChallengeTime = Date.now();
    var registrationOptions = await f2l.attestationOptions();
    let base64String = btoa(String.fromCharCode(...new Uint8Array(registrationOptions.challenge)));
    registrationOptions.challenge = registerChallenge;
    registrationOptions.user.id = userId;
    registrationOptions.user.name = username;
    registrationOptions.user.displayName = displayName;
    res.json(registrationOptions);
});

export default handler;
