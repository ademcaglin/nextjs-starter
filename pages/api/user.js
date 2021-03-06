import nextConnect from "next-connect";
import auth from "../../middleware/auth";

const handler = nextConnect();

handler
  .use(auth)
  .use((req, res, next) => {
    if (!req.user) {
      res.status(401).send("401");
    } else {
      next();
    }
  })
  .get((req, res) => {
    res.json({ session: req.session });
  });

export default handler;
