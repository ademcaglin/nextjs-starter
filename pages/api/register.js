import nextConnect from "next-connect";
import auth from "../../middleware/auth";
import { preFormatAttestationResultReq } from "../../lib/utils";
const { Fido2Lib } = require("fido2-lib");
const crypto = require("crypto");
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
    //console.log(req.session);
    //console.log(req.body);
    let attestationExpectations = {
        challenge: /*req.session.registerChallenge*/crypto.randomBytes(32).toString('base64'),
        origin: "http://localhost:3000",
        factor: "either",
        rpId: process.env.FIDO2_RPID
    };

    let reqBody = preFormatAttestationResultReq(req.body);
    console.log(reqBody);
    try {
        let regResult = await f2l.attestationResult(reqBody, attestationExpectations); // will throw on error
        console.log(regResult);
    }
    catch (ex) {
       console.log(ex);
    }
    return res.json("regResult");
});

export default handler;