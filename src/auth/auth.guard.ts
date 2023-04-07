import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService){}
  
  async canActivate(context: ExecutionContext): Promise<boolean>{
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();

    const apiKey = request.headers['x-api-key'];

    if(await this.authService.validateApiKey(apiKey)) {
      return true;
    } else {
      return response.status(401).send({ message: 'Unauthorized. You need a valid API-Key' });
    }
  }
}
