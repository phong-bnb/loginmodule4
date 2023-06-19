"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const user_model_1 = __importDefault(require("../schemas/user.model"));
const passport_local_1 = require("passport-local");
const passport_google_oauth20_1 = __importDefault(require("passport-google-oauth20"));
passport_1.default.serializeUser((user, done) => {
    done(null, user);
});
passport_1.default.deserializeUser(function (user, done) {
    done(null, user);
});
passport_1.default.use('local', new passport_local_1.Strategy(async (username, password, done) => {
    console.log(username, password);
    const user = await user_model_1.default.findOne({ username: username });
    if (!user) {
        return done(null, false);
    }
    else {
        if (user.password === password) {
            return done(null, user);
        }
        else {
            return done(null, false);
        }
    }
}));
passport_1.default.use(new passport_google_oauth20_1.default({
    clientID: '465770968275-cu8epae2eu6r61qa3f54ku0lgc8ac950.apps.googleusercontent.com',
    clientSecret: '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',
    callbackURL: 'http://localhost:3000/auth/google/callback',
    passReqToCallback: true,
}, async (request, accessToken, refreshToken, profile, done) => {
    try {
        console.log(profile, 'profile');
        let existingUser = await user_model_1.default.findOne({ 'google.id': profile.id });
        if (existingUser) {
            return done(null, existingUser);
        }
        console.log('Creating new user...');
        const newUser = new user_model_1.default({
            google: {
                id: profile.id,
            },
            username: profile.emails[0].value,
            password: null,
        });
        await newUser.save();
        console.log(newUser, 'newUser');
        return done(null, newUser);
    }
    catch (error) {
        return done(null, false);
    }
}));
exports.default = passport_1.default;
//# sourceMappingURL=passport.js.map