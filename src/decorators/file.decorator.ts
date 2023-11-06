/* eslint-disable prettier/prettier */
import { UseFilters, UseInterceptors, applyDecorators } from '@nestjs/common';
import { AnyFilesInterceptor, FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';
import { editFileName, imageFileFilter } from 'src/middleware/uploader';
import { diskStorage } from 'multer';
import { BodyInterceptor } from './BodyInterceptor';
import { DeleteFileOnErrorFilter, DeleteFilesOnErrorFilter } from './DeleteFileOnErrorFilter.decorator';

export function ApiFile(
  fieldName = 'file', // Default name of the field in the request body
  localOptions = '', // Default options for the Multer module and are empty by default
  restFild = {}, // Default additional fields object is empty
  required = false, // Default to non-required file upload
) {
  return applyDecorators(
    ApiConsumes('multipart/form-data'), // Decorator to set the 'Content-Type' header to 'multipart/form-data'
    ApiBody({
      // Decorator to set the request body schema
      schema: {
        type: 'object',
        required: required ? [fieldName] : [], // Include 'fieldName' as required if 'required' is true

        properties: {
          [fieldName]: {
            type: 'string',
            format: 'binary', // Set the format of the string to 'binary'
          },
          ...restFild, // Add the additional fields to the schema
        },
      },
    }),
    UseInterceptors(
      FileInterceptor(fieldName, {
        storage: diskStorage({
          destination: `public${localOptions}`, // Specify the file storage destination
          filename: editFileName, // Define the filename transformation function
        }),
        fileFilter: imageFileFilter, // Apply a file filter for allowed file types
      }),
      BodyInterceptor, // Apply a custom BodyInterceptor
    ),
    UseFilters(DeleteFileOnErrorFilter), // Apply a filter to handle errors during file upload
  );
}
// Define a custom decorator 'ApiFiles' for handling multiple file uploads
export function ApiFiles(
  fieldName = 'files', // Default name of the field in the request body
  localOptions = '', // Default options for the Multer module and are empty by default
  restFild = {}, // Default additional fields object is empty
  required = false, // Default to non-required file upload
  maxCount = 10, // Default maximum number of files allowed is 10
) {
  return applyDecorators(
    ApiConsumes('multipart/form-data'), // Decorator to set the 'Content-Type' header to 'multipart/form-data'
    ApiBody({
      // Decorator to set the request body schema
      schema: {
        type: 'object',
        required: required ? [fieldName] : [], // Include 'fieldName' as required if 'required' is true

        properties: {
          [fieldName]: {
            type: 'array', // Set the schema of the field to 'array' type
            items: {
              type: 'string',
              format: 'binary', // Set the format of the string to 'binary'
            },
          },
          ...restFild, // Add the additional fields to the schema
        },
      },
    }),
    UseInterceptors(
      FilesInterceptor(fieldName, maxCount, {
        storage: diskStorage({
          destination: `public${localOptions}`, // Specify the file storage destination
          filename: editFileName, // Define the filename transformation function
        }),
        fileFilter: imageFileFilter, // Apply a file filter for allowed file types
      }),
      BodyInterceptor, // Apply a custom BodyInterceptor
    ),
    // UseFilters(DeleteFileOnErrorFilter), // Apply a filter to handle errors during file upload
  );
}
//////////////////////////////////////////////////////////////////////////

export function VehicleFiles(
  fieldName = ['files'],
  localOptions?: string,
  restFeild?: any,
  required = false,
  fileFilter = imageFileFilter,
) {
  return applyDecorators(
    ApiConsumes('multipart/form-data'),
    ApiBody({
      schema: {
        type: 'object',
        required: required ? fieldName : [],
        properties: {
          carImage: {
            type: 'array',
            items: {
              type: 'string',
              format: 'binary',
            },
          },
          arAndroid: {
            type: 'array',
            items: {
              type: 'string',
              format: 'binary',
            },
          },
          arIso: {
            type: 'array',
            items: {
              type: 'string',
              format: 'binary',
            },
          },
          banner: {
            type: 'array',
            items: {
              type: 'string',
              format: 'binary',
            },
          },
          ...restFeild,
        },
      },
    }),
    UseInterceptors(
      AnyFilesInterceptor({
        storage: diskStorage({
          destination: (req, file, cb) => {
            const destination = `public${localOptions}/${file.fieldname}`;
            cb(null, destination);
          },
          filename: editFileName,
        }),
        fileFilter: fileFilter,
      }),
      BodyInterceptor,
    ),
    UseFilters(DeleteFilesOnErrorFilter),
  );
}


///////////////////////////////////////////////////////////////////////////