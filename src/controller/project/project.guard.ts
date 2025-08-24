import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'express';

@Injectable()
export class ProjectGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const PROJECT_ID: string = request.headers['X-Project-Id'] as string;
    return PROJECT_ID !== undefined; //TODO check project id in db and right user resources
  }
}
