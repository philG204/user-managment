import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { AuthService } from './auth.service';

@Injectable()
export class ApiKeyMiddleware implements NestMiddleware {

  constructor(private authService: AuthService){}

  use(req: any, res: any, next: NextFunction) {
    const apiKey = req.headers['x-api-key'];
    if (apiKey && this.authService.validateApiKey(apiKey)) {
      return next();
    } else {
      return res.status(401).send({ message: 'Unauthorized' });
    }
  }
}
