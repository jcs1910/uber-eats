import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    console.log('context', context);
    const gqlContext = GqlExecutionContext.create(context).getContext(); // change http context to graphql context
    const user = gqlContext['user'];
    if (!user) {
      return false;
    }
    return true;
  }
}
