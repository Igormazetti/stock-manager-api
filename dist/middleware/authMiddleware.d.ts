import { NextFunction, Request, Response } from 'express';
export declare const authMiddleware: (req: Request, _res: Response, next: NextFunction) => Promise<void>;
