/* eslint-disable prettier/prettier */
import { Injectable, NestInterceptor, ExecutionContext, CallHandler, BadGatewayException, InternalServerErrorException, NotFoundException, BadRequestException } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorsInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((error) => {
        if (error instanceof BadGatewayException) {
          console.error('Bad Gateway Error:', error.message);
          throw new BadGatewayException('A Bad Gateway error occurred.');
        } else if (error instanceof InternalServerErrorException) {
          console.error('Internal Server Error:', error.message);
          throw new InternalServerErrorException('An internal server error occurred.');
        } else if (error instanceof NotFoundException) {
          console.error('Not Found Error:', error.message);
           throw new NotFoundException('Resource not found.');
        } else if (error instanceof BadRequestException) {
          console.error('Bad Request Error:', error.message);
          throw new BadRequestException('Bad request.');
        } else {
          console.error('Other Error:', error.message);
          return throwError('An unexpected error occurred.');
        }
      }),
    );
  }
}
