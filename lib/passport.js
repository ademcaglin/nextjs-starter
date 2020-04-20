import passport from "passport";
import custom from "passport-custom";

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(req, id, done) {
  done(null, { id: id });
});
passport.use(
  "custom",
  new custom.Strategy(function(req, callback) {
    callback(null, { id: 2 });
  })
);

export default passport;
