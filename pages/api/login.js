import nextConnect from "next-connect";
import auth from "../../middleware/auth";
import passport from "../../lib/passport";

const handler = nextConnect();

handler.use(auth).get(passport.authenticate("custom"), (req, res) => {
  res.json({ user: req.user });
});

export default handler;
