import { Request, Response, NextFunction } from 'express';

declare module 'express-session' {
  interface Session {
    passport?: any;
  }
}

export const authorizeUser = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (!req.session?.passport || !req.session.passport.user) {
    return res.redirect('/login');
  }
  next();
};
