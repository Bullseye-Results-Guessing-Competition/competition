import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpService,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class TokenGuard implements CanActivate {
  constructor(private httpService: HttpService) {}

  canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    return this.httpService
      .post(process.env.VERIFY_TOKEN_URL, { token: request.query.access_token })
      .toPromise()
      .then(res => {
        request.role = res.data.role
        
        return true;
      })
      .catch(err => {
        throw new UnauthorizedException();
      });
  }
}
