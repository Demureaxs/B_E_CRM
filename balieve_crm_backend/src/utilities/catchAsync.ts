import { Request, Response, NextFunction } from 'express';
import { Error } from 'mongoose';


export const catchAsync = (fn: Function) => {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        await fn(req, res, next);
      } catch (err: any) {
        if (err instanceof Error.ValidationError) {
            const errors: any = {};
            for (const [key, value] of Object.entries(err.errors)) {
              errors[key] = value.message;
            }
            res.status(400).json({ error: errors });
          } else {
            console.error(err);
            res.status(500).json({ error: 'Server Error' });
          }
      }
    };
  };
  