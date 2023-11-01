/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCountryDto } from './dto/create-country.dto';
import { UpdateCountryDto } from './dto/update-country.dto';
import { AssetService } from './assets.service';
import * as fs from 'fs';
import sizeOf from 'image-size';
@Injectable()
export class CountryService {
  constructor(
    private prisma: PrismaService,
    private readonly assetService: AssetService,
  ) {}
  async createCountry(
    files: Express.Multer.File[],
    createCountryDto: CreateCountryDto,
  ) {
    const assets = [];
    console.log('files', files);

    for (const file of files) {
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

        const icone = file.path.replace('public', '');
        const asset = {
          fileType: file.mimetype,
          fileName: icone,
          height: imageProperties.height,
          width: imageProperties.width,
          tags,
          slug: icone,
          mimeType: file.mimetype,
          fileSize: file.size,
          isImage: true,
        };
        console.log('asset', asset);
        assets.push(asset);
      } else {
        throw new Error('Uploaded file is not an image.');
      }
    }
    const country = await this.prisma.country.create({
      data: {
        ...createCountryDto,
        icon: {
          create: assets,
        },
      },
    });

    return country;
  }
  async getCountryIcons(countryId: number) {
    return this.prisma.country.findUnique({
      where: { id: countryId },
      include: {
        icon: true,
      },
    });
  }
  async getAllCountries() {
    return this.prisma.country.findMany({
      include: {
        icon: true,
      },
    });
  }
  //delete country by id
  async deleteCountry(id: number) {
    const existingCountry = await this.prisma.country.findUnique({
      where: { id },
      include: { icon: true },
    });

    if (!existingCountry) {
      throw new NotFoundException('Country not found');
    }
    if (existingCountry.icon) {
      for (const icon of existingCountry.icon) {
        const iconPath = `./public/${icon.slug}`;
        fs.unlinkSync(iconPath);
      }
    }
    const deletedCountry = await this.prisma.country.delete({
      where: { id },
    });

    return deletedCountry;
  }

  async updateCountry(id: number, updateCountryDto: UpdateCountryDto) {
    const existingCountry = await this.prisma.country.findUnique({
      where: { id },
    });

    if (!existingCountry) {
      throw new NotFoundException('Country not found');
    }
    const updatedCountry = await this.prisma.country.update({
      where: { id },
      data: {
        ...updateCountryDto,
      },
    });
    return updatedCountry;
  }
  async updateCountryIcon(
    id: number,
    files: Express.Multer.File[],
    updateCountryDto: UpdateCountryDto,
  ) {
    const existingCountry = await this.prisma.country.findUnique({
      where: { id },
      include: { icon: true },
    });

    if (!existingCountry) {
      throw new NotFoundException('Country not found');
    }

    // Check if the icon has changed
    let iconChanged = false;
    if (files.length > 0) {
      const newIconSlug = files[0].path.replace('public', '');
      iconChanged = newIconSlug !== existingCountry.icon[0].slug;
    }

    if (iconChanged) {
      // Delete the old assets
      for (const asset of existingCountry.icon) {
        const oldIconPath = `./public/${asset.slug.replace(/\\/g, '/')}`;
        fs.unlinkSync(oldIconPath);
        await this.prisma.assets.delete({
          where: { id: asset.id },
        });
      }

      // Iterate through each uploaded file and create new assets
      const assets = [];
      for (const file of files) {
        const icone = file.path.replace('public', '');

        if (file.mimetype.startsWith('image/')) {
          const buffer = fs.readFileSync(file.path);
          const imageProperties = sizeOf(buffer);
          const fileSizeInMB = file.size;
          const tags = ['image', file.mimetype];
          if (fileSizeInMB > 2) {
            tags.push('image/large');
          } else {
            tags.push('image/small');
          }
          const asset = {
            fileType: file.mimetype,
            fileName: icone,
            height: imageProperties.height,
            width: imageProperties.width,
            tags,
            slug: icone,
            mimeType: file.mimetype,
            fileSize: file.size,
            isImage: true,
          };
          assets.push(asset);
        }
      }
      const updatedCountry = await this.prisma.country.update({
        where: { id },
        data: {
          ...updateCountryDto,
          icon: {
            create: assets,
          },
        },
        include: {
          icon: true,
        },
      });

      return updatedCountry;
    } else {
      console.log('updateCountryDto', updateCountryDto);
      const { icons, ...updateData } = updateCountryDto;

      const updatedCountry = await this.prisma.country.update({
        where: { id },
        data: {
          ...updateData,
        },
        include: {
          icon: true,
        },
      });

      return updatedCountry;
    }
  }
}
