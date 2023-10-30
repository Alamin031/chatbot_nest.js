import { ApiProperty } from '@nestjs/swagger';
import {
  IsNumber,
  IsBoolean,
  IsString,
  IsObject,
  IsEnum,
  IsOptional,
} from 'class-validator';
import { CountryStatus } from 'src/types/country/types';

class IconDto {
  @IsNumber()
  id: number;

  @IsString()
  value: string;
}

class CreateCountryDto {
  @IsObject()
  @ApiProperty({
    description: 'Country names in English and Arabic',
    example: { en: 'EnglishName', ar: 'ArabicName' },
  })
  name: object;

  @IsBoolean()
  @ApiProperty()
  hasAreas: boolean;

  @IsObject()
  @IsOptional()
  @ApiProperty({
    description: 'Country url in English and Arabic',
    example: { en: 'EnglishName', ar: 'ArabicName' },
  })
  url?: object;

  @IsEnum(CountryStatus)
  @IsOptional()
  @ApiProperty()
  status: CountryStatus;
}

export { CreateCountryDto, IconDto };
