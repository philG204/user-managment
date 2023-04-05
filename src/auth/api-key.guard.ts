import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ApiKeyMiddleware } from './api-key.middleware';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(private readonly apiKeyMiddleware: ApiKeyMiddleware){}
  
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();
    return new Promise((resolve) => {
      this.apiKeyMiddleware.use(request, response, () => {
        resolve(true);
      });
    });
  }
}
