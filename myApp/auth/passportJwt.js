// 유저 인증을 처리한다
// token을 해석하여 일치하는 유저를 찾는다
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const { User } = require("../models/model");
const passport = require("passport");
const opts = {};

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = "shhhhh";

passport.use(new JwtStrategy(opts, (jwt_payload, done)=>{

  // user 컬렉션에서 user를 검색한다
  // jwt의 payload에 담긴 username을 사용한다
  User.findOne({username:jwt_payload.username},(err,user)=>{
    if (err) {
      return done(err,false);
    }
    if (user) {
      return done(null, user);
    } else {
      return done(null,false);
    }
  })
}))