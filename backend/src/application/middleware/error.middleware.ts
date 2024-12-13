import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class ErrorMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        res.on('finish', () => {
            if (res.statusCode >= 400) {
                const errorMessage = res.locals.error?.message || 'Ocurrió un error inesperado';
                res.json({
                    statusCode: res.statusCode,
                    message: errorMessage,
                });
            }
        });
        next();
    }
}
