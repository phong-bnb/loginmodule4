import passport from 'passport';

import UserModel from '../schemas/user.model';

import { Strategy } from 'passport-local';

import GoogleStrategy from 'passport-google-oauth20';

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

passport.use(
  'local',
  new Strategy(async (username, password, done) => {
    console.log(username, password)
    const user = await UserModel.findOne({ username: username });

    if (!user) {
      return done(null, false);
    } else {
      if (user.password === password) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    }
  })
);

passport.use(
  new GoogleStrategy(
    {
      clientID:
        '465770968275-cu8epae2eu6r61qa3f54ku0lgc8ac950.apps.googleusercontent.com',

      clientSecret: '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',

      callbackURL: 'http://localhost:3000/auth/google/callback',

      passReqToCallback: true,
    },

    async (request, accessToken, refreshToken, profile, done) => {
      try {
        console.log(profile, 'profile');

        let existingUser = await UserModel.findOne({ 'google.id': profile.id });

        // if user exists return the user

        if (existingUser) {
          return done(null, existingUser);
        }

        // if user does not exist create a new user

        console.log('Creating new user...');

        const newUser = new UserModel({
          google: {
            id: profile.id,
          },

          username: profile.emails[0].value,

          password: null,
        });

        await newUser.save();

        console.log(newUser, 'newUser');

        return done(null, newUser);
      } catch (error) {
        return done(null, false);
      }
    }
  )
);

export default passport;
