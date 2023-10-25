import {
  ExceptionFilter, // Import ExceptionFilter class for custom error handling
  Catch,
  ArgumentsHost,
  BadRequestException, // Import BadRequestException class from NestJS
} from '@nestjs/common';
import { Request, Response } from 'express';
import * as fs from 'fs';
import { isArray } from 'lodash';

// Define a custom exception filter for handling single file upload errors
@Catch(BadRequestException)
export class DeleteFileOnErrorFilter implements ExceptionFilter {
  // Implement the catch method required by the ExceptionFilter interface
  catch(exception: BadRequestException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    // Attempt to delete the uploaded file on error
    fs.unlink(request.file.path, (err) => {
      if (err) {
        console.error(err);
        return err;
      }
    });

    // Send a response with the same status and error details
    response.status(status).json(exception.getResponse());
  }
}

// Define a custom exception filter for handling multiple file upload errors
@Catch(BadRequestException)
export class DeleteFilesOnErrorFilter implements ExceptionFilter {
  // Implement the catch method required by the ExceptionFilter interface
  catch(exception: BadRequestException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    // Define a function to extract file paths from the request
    const getFiles = (file: Express.Multer.File | unknown | undefined) => {
      if (!file) return [];
      if (isArray(file)) return file;
      return Object.values(file);
    };

    // Get an array of file paths
    const filePaths: any = getFiles(request.file);

    // Attempt to delete each uploaded file on error
    for (const file of filePaths) {
      fs.unlink(file.path, (err) => {
        if (err) {
          console.error(err);
          return err;
        }
      });
    }

    // Send a response with the same status and error details
    response.status(status).json(exception.getResponse());
  }
}
