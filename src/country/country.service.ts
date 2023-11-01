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
  // async create(file: Express.Multer.File, createCountryDto: CreateCountryDto) {
  //   const path = file.path.replace('public', '');
  //   createCountryDto;
  //   const data = {
  //     ...createCountryDto,
  //     icon: path,
  //   };

  //   console.log(data);

  //   const Country = await this.prisma.country.create({
  //     data,
  //   });

  //   return Country;
  // }
  // async createCountry(
  //   file: Express.Multer.File,
  //   createCountryDto: CreateCountryDto,
  // ) {
  //   const path = file.path.replace('public', '');

  //   // Create the country
  //   const country = await this.prisma.country.create({
  //     data: {
  //       ...createCountryDto,
  //     },
  //   });

  //   // Automatically create associated assets (e.g., icons) using the AssetsService
  //   const icon = await this.assetService.uploadIcon(file, country.id);

  //   // Associate the icon with the country (assuming you have a relationship)
  //   await this.prisma.country.update({
  //     where: { id: country.id },
  //     data: {
  //       icon: { connect: { id: icon.id } },
  //     },
  //   });

  //   return country;
  // }

  // async createCountry(
  //   files: Express.Multer.File[],
  //   createCountryDto: CreateCountryDto,
  // ) {
  //   console.log('createCountryDto', createCountryDto);

  //   // Iterate through each uploaded file
  //   for (const file of files) {
  //     const icone = file.path.replace('public', '');

  //     console.log('file', file);
  //     console.log('icone', icone);

  //     if (file.mimetype.startsWith('image/')) {
  //       const buffer = fs.readFileSync(file.path);
  //       const imageProperties = sizeOf(buffer);
  //       const fileSizeInMB = file.size / 1024 / 1024;
  //       const tags = ['image', file.mimetype];

  //       if (fileSizeInMB > 2) {
  //         tags.push('image/large');
  //       } else {
  //         tags.push('image/small');
  //       }

  //       // Create the country for each file
  //       const country = await this.prisma.country.create({
  //         data: {
  //           ...createCountryDto,
  //           icon: {
  //             create: {
  //               fileType: file.mimetype,
  //               fileName: icone,
  //               height: imageProperties.height,
  //               width: imageProperties.width,
  //               tags,
  //               slug: icone,
  //               mimeType: file.mimetype,
  //               fileSize: file.size,
  //               isImage: true,
  //             },
  //           },
  //         },
  //       });
  //       return country;
  //     } else {
  //       throw new Error('Uploaded file is not an image.');
  //     }
  //   }
  // }
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
    // Update the country's information
    const updatedCountry = await this.prisma.country.update({
      where: { id },
      data: {
        ...updateCountryDto,
      },
    });
    return updatedCountry;
  }

  // Update country icon
  // async updateCountryIcon(id: number, files: Express.Multer.File[]) {
  //   const existingCountry = await this.prisma.country.findUnique({
  //     where: { id },
  //     include: { icon: true },
  //   });

  //   if (!existingCountry) {
  //     throw new NotFoundException('Country not found');
  //   }

  //   const oldAssets = existingCountry.icon;

  //   // Delete the old assets from the database
  //   for (const oldAsset of oldAssets) {
  //     const oldIconPath = `./public/${oldAsset.slug.replace(/\\/g, '/')}`;
  //     fs.unlinkSync(oldIconPath);
  //     await this.prisma.assets.delete({
  //       where: { id: oldAsset.id },
  //     });
  //   }

  //   const assets = [];
  //   for (const file of files) {
  //     const icone = file.path.replace('public', '');

  //     if (file.mimetype.startsWith('image/')) {
  //       const buffer = fs.readFileSync(file.path);
  //       const imageProperties = sizeOf(buffer);
  //       const fileSizeInMB = file.size;
  //       const tags = ['image', file.mimetype];
  //       if (fileSizeInMB > 2) {
  //         tags.push('image/large');
  //       } else {
  //         tags.push('image/small');
  //       }

  //       // Create the new asset object
  //       const asset = await this.prisma.assets.create({
  //         data: {
  //           fileType: file.mimetype,
  //           fileName: icone,
  //           height: imageProperties.height,
  //           width: imageProperties.width,
  //           tags,
  //           slug: icone,
  //           mimeType: file.mimetype,
  //           fileSize: file.size,
  //           isImage: true,
  //         },
  //       });

  //       assets.push(asset);
  //     }
  //   }
  //   const updatedCountry = await this.prisma.country.update({
  //     where: { id },
  //     data: {
  //       icon: {
  //         connect: assets.map((asset) => ({ id: asset.id })),
  //       },
  //     },
  //     include: {
  //       icon: true,
  //     },
  //   });

  //   return updatedCountry;
  // }

  // Update country icon and optionally other fields
  // async updateCountryIcon(
  //   id: number,
  //   files: Express.Multer.File[],
  //   updateCountryDto: UpdateCountryDto,
  // ) {
  //   const existingCountry = await this.prisma.country.findUnique({
  //     where: { id },
  //     include: { icon: true },
  //   });

  //   if (!existingCountry) {
  //     throw new NotFoundException('Country not found');
  //   }

  //   // Save the IDs of the old assets that will be deleted
  //   const assetIdsToDelete = existingCountry.icon.map((asset) => asset.id);

  //   // Delete the old assets from the database
  //   for (const assetId of assetIdsToDelete) {
  //     const asset = existingCountry.icon.find((a) => a.id === assetId);
  //     if (asset) {
  //       const oldIconPath = `./public/${asset.slug.replace(/\\/g, '/')}`;
  //       fs.unlinkSync(oldIconPath);
  //       await this.prisma.assets.delete({
  //         where: { id: assetId },
  //       });
  //     }
  //   }

  //   // Iterate through each uploaded file
  //   const assets = [];
  //   for (const file of files) {
  //     const icone = file.path.replace('public', '');

  //     if (file.mimetype.startsWith('image/')) {
  //       const buffer = fs.readFileSync(file.path);
  //       const imageProperties = sizeOf(buffer);
  //       const fileSizeInMB = file.size;
  //       const tags = ['image', file.mimetype];
  //       if (fileSizeInMB > 2) {
  //         tags.push('image/large');
  //       } else {
  //         tags.push('image/small');
  //       }
  //       const asset = {
  //         fileType: file.mimetype,
  //         fileName: icone,
  //         height: imageProperties.height,
  //         width: imageProperties.width,
  //         tags,
  //         slug: icone,
  //         mimeType: file.mimetype,
  //         fileSize: file.size,
  //         isImage: true,
  //       };
  //       assets.push(asset);
  //     }

  //     const updatedCountry = await this.prisma.country.update({
  //       where: { id },
  //       data: {
  //         ...updateCountryDto, // Add other fields to update
  //         icon: {
  //           create: assets, // Create the new assets
  //         },
  //       },
  //       include: {
  //         icon: true,
  //       },
  //     });
  //     return updatedCountry;
  //   }
  // }
  ///////////////////////////////////////////////////////
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

  //get all country
  async findAll(): Promise<any> {
    const data = await this.prisma.country.findMany();
    return data;
  }

  //get country by id
  async findOne(id: number): Promise<any> {
    const data = await this.prisma.country.findUnique({
      where: { id },
    });
    return data;
  }

  //delete country by id
  async delete(id: number): Promise<any> {
    const data = await this.prisma.country.delete({
      where: { id },
    });
    return data;
  }
}
