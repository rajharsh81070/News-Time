const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../model/User');

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken("Bearer");
opts.secretOrKey = process.env.TOKEN_SECRET;

module.exports = passport => {
  passport.use(
    new JwtStrategy(opts, async (jwt_payload, done) => {
      const user = await User.findById(jwt_payload.id);
      try {
        if (!user) {
          return done(null, false);
        }
        return done(null, user);
      }
      catch (err) {
        console.log(err);
      }
    })
  );
}