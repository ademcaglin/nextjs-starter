import nextConnect from "next-connect";
import session from "../lib/challengeSession";

const challenge = nextConnect().use(
  session({
    name: "challenge_sess",
    secret: process.env.SESSION_SECRET,
    cookie: {
      maxAge: 60 * 60 * 24, // 8 hours,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      sameSite: "lax"
    }
  })
);

export default challenge;
