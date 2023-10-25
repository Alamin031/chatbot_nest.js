import { createParamDecorator, ExecutionContext } from '@nestjs/common';

// Define a custom parameter decorator named GetUser
export const GetUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    // Extract the request object from the execution context
    const request = ctx.switchToHttp().getRequest();

    // Return the user property from the request object
    return request.user;
  },
);

/* ctx: ExecutionContext: This parameter 
represents the execution context and provides 
access to the request and response objects.*/
