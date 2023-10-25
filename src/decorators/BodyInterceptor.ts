import {
  BadRequestException, // Import the BadRequestException class from NestJS for error handling
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';

// Define a utility function to check if a string is JSON
function isJson(str: string) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}

@Injectable()
export class BodyInterceptor implements NestInterceptor {
  // Implement the NestInterceptor interface for intercepting requests
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // Obtain the request from the execution context
    const request = context.switchToHttp().getRequest();

    try {
      // Create a copy of the request body for manipulation
      const body = { ...request.body };
      console.log(request.body); // Log the original request body

      // Iterate through the keys of the request body
      Object.keys({ ...request.body }).forEach((key) => {
        if (key === 'id') return; // Skip the 'id' field

        if (isJson(body[key])) {
          // If the value at the key is a JSON string
          // Parse the JSON, removing control characters
          request.body[key] = JSON.parse(
            body[key].toString().replace(/[\u0000-\u0019]+/g, ''),
          );
        } else {
          // If the value is not JSON, retain it as is
          request.body[key] = body[key];
        }
      });
    } catch (err) {
      // If an error occurs during the process, throw a BadRequestException
      throw new BadRequestException(err.message);
    }

    // Continue the request handling process
    return next.handle();
  }
}
// "In summary, this code is used to create an interceptor
//  that checks and sanitizes the request body
//  data to ensure it's valid JSON and safe to process.
// If any issues are detected, it throws a bad request
// exception.This interceptor can be added to NestJS
// routes to perform these checks and manipulations for incoming
// requests"
