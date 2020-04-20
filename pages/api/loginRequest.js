import nextConnect from "next-connect";
import challenge from "../../middleware/challenge";
const handler = nextConnect();

handler.use(challenge).get("/login-request", (req, res) => {
  //const { username } = req.body;
  // get user_id from endpoint
  // generate challenge
  // {u.id, challenge}
  res.json({ user: req.user });
});

export default handler;
