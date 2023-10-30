import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCountryDto } from './dto/create-country.dto';
import { UpdateCountryDto } from './dto/update-country.dto';

@Injectable()
export class CountryService {
  constructor(private prisma: PrismaService) {}
  async create(file: Express.Multer.File, createCountryDto: CreateCountryDto) {
    const path = file.path.replace('public', '');
    createCountryDto;
    const data = {
      ...createCountryDto,
      icon: path,
    };

    console.log(data);

    const Country = await this.prisma.country.create({
      data,
    });

    return Country;
  }
  //update by id country

  async update(
    id: number,
    file: Express.Multer.File | null,
    updateCountryDto: UpdateCountryDto,
  ): Promise<any> {
    const existingCountry = await this.prisma.country.findUnique({
      where: { id },
    });

    if (!existingCountry) {
      throw new NotFoundException('Country not found');
    }

    let iconPath = existingCountry.icon; // Default to the existing icon path
    if (file) {
      // If a new image is provided, update the iconPath
      const path = file.path.replace('public', '');
      iconPath = path;
    }

    const data = {
      ...updateCountryDto,
      icon: iconPath, // Use the new icon path or the existing one
    };

    const updatedCountry = await this.prisma.country.update({
      where: { id },
      data,
    });

    return updatedCountry;
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
