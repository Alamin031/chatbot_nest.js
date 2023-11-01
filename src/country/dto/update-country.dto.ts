// import { PartialType } from '@nestjs/swagger';
// import { CreateCountryDto } from './create-country.dto';

// export class UpdateCountryDto extends PartialType(CreateCountryDto) {}

import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsObject, IsEnum, IsOptional } from 'class-validator';
import { CountryStatus } from 'src/types/country/types';

class UpdateCountryDto {
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
  icons?: [];
}

export { UpdateCountryDto };
