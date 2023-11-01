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

class CreateDto {
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
  @ApiProperty()
  @IsString()
  fileType?: string;

  // Tags can be customized based on your requirements
  @ApiProperty()
  tags?: string[];

  // Height and width are automatically extracted from the uploaded image
  @ApiProperty()
  @IsNumber()
  height?: number;

  @ApiProperty()
  @IsNumber()
  width?: number;

  // The following fields are filled automatically based on the uploaded image
  @ApiProperty()
  slug?: string;

  @ApiProperty()
  fileName?: string;

  @ApiProperty()
  mimeType?: string;

  @ApiProperty()
  @IsNumber()
  fileSize?: number;
}

export { CreateDto, IconDto };
