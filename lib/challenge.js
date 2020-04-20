import { parse, serialize } from "cookie";
import Iron from "@hapi/iron";

export const serializeChallengeCookie = (secret, userId) => {
  const cookieSerialized = serialize("challenge_session", secret, {
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 72576000,
    httpOnly: true,
    path: "/"
  });
  return cookieSerialized;
};
