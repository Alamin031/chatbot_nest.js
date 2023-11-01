import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { PrismaService } from 'src/prisma/prisma.service';
import sizeOf from 'image-size';

@Injectable()
export class AssetService {
  constructor(private readonly prisma: PrismaService) {}

  async uploadIcon(file: Express.Multer.File, countryId: number) {
    const path = file.path.split('public')[1];
    console.log('File:', file);
    if (file.mimetype.startsWith('image/')) {
      const buffer = fs.readFileSync(file.path);
      const imageProperties = sizeOf(buffer);
      const fileSizeInMB = file.size / 1024 / 1024;
      const tags = ['image', file.mimetype];
      if (fileSizeInMB > 2) {
        tags.push('image/large');
      } else {
        tags.push('image/small');
      }
      // Save the file to a local directory
      fs.writeFileSync(path, buffer);

      const savedIcon = await this.prisma.assets.create({
        data: {
          fileType: 'image',
          tags,
          height: imageProperties.height,
          width: imageProperties.width,
          fileName: path,
          slug: path,
          mimeType: file.mimetype,
          fileSize: file.size,
          isImage: true,
          countryId: countryId,
        },
      });

      // Remove the temporary file from the server (if needed)
      fs.unlinkSync(file.path);

      return savedIcon;
    } else {
      throw new Error('Uploaded file is not an image.');
    }
  }
}
