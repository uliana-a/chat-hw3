const passport = require("passport");
const JWTStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const users = require('./data/userlist.json');

const opts = {
    secretOrKey: 'someSecret',
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken() 
};

passport.use(new JWTStrategy(opts, async (payload, done)=>{
    try {
        const user = users.find(userFromDB => {
            if(userFromDB.name === payload.login){
                return userFromDB;
            }
        });
        return user ? done(null,user):done({status: 401, message: "Token is invalid"}, null);
    } catch  {
        return done(err);
    }
}
));