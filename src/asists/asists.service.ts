import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAsistsDto } from './dto/asists.create.dto';
import { Asists } from '@prisma/client';
// import imageSize from 'image-size';
// import * as sizeOf from 'buffer-image-size';
import sizeOf from 'image-size';
import * as fs from 'fs';

@Injectable()
export class AsistsService {
  constructor(private readonly prisma: PrismaService) {}

  //create
  // async processImageFile(
  //   data: CreateAsistsDto,
  //   file: Express.Multer.File,
  // ): Promise<Asists> {
  //   try {
  //     const fileName = file.path.split('public')[1];

  //     if (file.mimetype.startsWith('image/')) {
  //       // Extract the relative file path
  //       console.log('File:', file);
  //       console.log('File mimetype:', file.mimetype);
  //       console.log('File path:', file.path);
  //       console.log('File originalname:', file.originalname);
  //       console.log('File size:', file.size);
  //       console.log('file sulg:', fileName);
  //       // Read the image file into a buffer
  //       const buffer = fs.readFileSync(file.path);

  //       // Attempt to get image properties
  //       // const imageProperties = imageSize(file.buffer);
  //       // const imageProperties = sizeOf(file.buffer);
  //       const imageProperties = sizeOf(buffer);

  //       console.log('Image Properties:', imageProperties);
  //       // const tags = [data.fileType || null, file.mimetype, 'image/large'];
  //       const asistsData = {
  //         fileType: 'image',
  //         tags: [data.fileType || null, file.mimetype, 'image/large'],
  //         height: imageProperties.height,
  //         width: imageProperties.width,
  //         slug: fileName,
  //         fileName,
  //         mimeType: file.mimetype,
  //         fileSize: file.size,
  //         isImage: true,
  //         createdBy: data.createdBy || null,
  //       };
  //       const createdAsists = await this.prisma.asists.create({
  //         data: {
  //           ...asistsData,
  //         },
  //       });

  //       return createdAsists;
  //     } else {
  //       throw new Error('Uploaded file is not an image.');
  //     }
  //   } catch (error) {
  //     console.error('Error while processing the image:', error);
  //     throw new Error('Failed to process the image.');
  //   }
  // }
  async processImageFile(
    data: CreateAsistsDto,
    file: Express.Multer.File,
  ): Promise<Asists> {
    try {
      const fileName = file.path.split('public')[1];

      if (file.mimetype.startsWith('image/')) {
        // Check if the file has an image mimetype (e.g., 'image/jpeg', 'image/png', etc.).

        // Read the image file into a buffer
        const buffer = fs.readFileSync(file.path);

        // Attempt to get image properties using the 'sizeOf' function.
        const imageProperties = sizeOf(buffer);
        const fileSizeInMB = file.size / (1024 * 1024);
        const tags = ['image', file.mimetype];
        if (fileSizeInMB > 2) {
          tags.push('image/large');
        } else {
          tags.push('image/small');
        }
        const asistsData = {
          fileType: 'image',
          tags,
          height: imageProperties.height,
          width: imageProperties.width,
          slug: fileName,
          fileName,
          mimeType: file.mimetype,
          fileSize: file.size,
          isImage: true,
          createdBy: data.createdBy || null,
        };

        const createdAsists = await this.prisma.asists.create({
          data: asistsData,
        });

        return createdAsists;
      } else {
        throw new Error('Uploaded file is not an image.');
      }
    } catch (error) {
      console.error('Error while processing the image:', error);
      throw new Error('Failed to process the image.');
    }
  }

  //get by id
  async show(id: number) {
    const asists = await this.prisma.asists.findUnique({
      where: { id },
    });
    return asists;
  }
  //get all
  async showall(): Promise<any[]> {
    const asists = await this.prisma.asists.findMany();
    return asists;
  }
  //update by id
  async update(id: number, data: any): Promise<any> {
    const asists = await this.prisma.asists.update({
      where: { id },
      data,
    });
    return asists;
  }
  //delete by id
  async delete(id: number): Promise<any> {
    const asists = await this.prisma.asists.delete({
      where: { id },
    });
    return asists;
  }
}
