import {
  CanActivate,
  ExecutionContext,
  Injectable,
  SetMetadata,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { ProjectService } from '../project/project.service';
import { Request } from 'express';
import { Reflector } from '@nestjs/core';

@Injectable()
export class SiteGuard implements CanActivate {
  constructor(
    private readonly projectService: ProjectService,
    private readonly reflector: Reflector,
  ) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const skip = this.reflector.getAllAndOverride<boolean>(SKIP_SITE_GUARD, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (skip) {
      return true;
    }

    const request: Request = context.switchToHttp().getRequest();
    const PROJECT_ID: string = request.headers['X-Project-Id'] as string;
    const SITE_ID: string = request.params?.siteId;

    return this.projectService.checkSiteInProject(PROJECT_ID, SITE_ID);
  }
}

const SKIP_SITE_GUARD: string = 'skipSiteGuard';
export const SkipSiteGuard = () => SetMetadata(SKIP_SITE_GUARD, true);
