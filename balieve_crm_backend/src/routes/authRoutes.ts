import { Request, Response } from 'express';
import passport from 'passport';

export default function authRoutes(app: any): void {
  app.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email'],
      prompt: 'select_account',
    })
  );

  app.get(
    '/auth/google/callback',
    passport.authenticate('google'),
    (req: Request, res: Response) => {
      res.redirect('/');
    }
  );

  app.get('/api/v1/logout', (req: Request, res: Response) => {
    req.logout(() => {
      req.session?.destroy(() => {
        res.status(200).json({ message: 'User logged out successfully.' });
      });
    });
  });

  app.get('/api/v1/current_user', (req: Request, res: Response) => {
    res.send(req.user);
  });
}
