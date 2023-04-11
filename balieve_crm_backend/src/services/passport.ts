import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import mongoose from 'mongoose';
import { Request, Response, NextFunction } from 'express';

const User = mongoose.model('users');

passport.serializeUser((user: any, done: (err: any, id?: any) => void) => {
  done(null, user.id);
});

passport.deserializeUser(
  async (id: any, done: (err: any, user?: any) => void) => {
    const user = await User.findById(id);
    done(null, user);
  }
);

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      callbackURL: '/auth/google/callback',
      proxy: true,
    },
    async (
      accessToken: string,
      refreshToken: string,
      profile: any,
      done: (err: any, user?: any) => void
    ) => {
      const existingUser = await User.findOne({ googleId: profile.id });
      if (existingUser) {
        done(null, existingUser);
      } else {
        const user = await new User({
          googleId: profile.id,
          displayName: profile.displayName,
          email: profile.emails[0].value,
          photo: profile.photos[0].value,
        }).save();

        done(null, user);
      }
    }
  )
);
