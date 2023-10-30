import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from '@prisma/client';

export const LogAdminData = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    const user: User = request.user; // Assuming you store the user data in the request

    // Check if the user has the 'admin' role
    if (user.roles === 'admin') {
      // Log admin data to the console
      console.log('Admin Data:', user);
    }

    return user;
  },
);
/* ctx: ExecutionContext: This parameter 
represents the execution context and provides 
access to the request and response objects.*/
