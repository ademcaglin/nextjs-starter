import { parse, serialize } from "cookie";
import Iron from "@hapi/iron";

export const serializeChallengeCookie = async (userId) => {
  const sealed = await Iron.seal({ user_id: userId, challenge: "random" }, process.env.SESSION_SECRET, Iron.defaults)
  const cookieSerialized = serialize("challenge_session", sealed, {
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 5, // 5 min
    httpOnly: true,
    path: "/"
  });
  return cookieSerialized;
};
