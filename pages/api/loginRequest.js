import nextConnect from "next-connect";
import auth from "../../middleware/auth";
import { serializeChallengeCookie } from "../../lib/challenge";
const handler = nextConnect();

handler.use(auth).get(async (req, res) => {
  req.session.isLoggedIn = false
  //const cookieSerialized = await serializeChallengeCookie("12")
  //res.setHeader('Set-Cookie', cookieSerialized)
  //const { username } = req.body;
  // get user_id from endpoint
  // generate challenge
  // {u.id, challenge}
  res.json({ challenge: "d" });
});

export default handler;
