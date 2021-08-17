import { createParamDecorator, ExecutionContext } from '@nestjs/common';

/**
 * Extracts the JWT from the request's headers
 */
export const Token = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const auth = request.headers['authorization'];
    const token = auth.split(' ')[1];
    return token;
  },
);
