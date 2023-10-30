import { ApiProperty } from '@nestjs/swagger';
import { Country } from '@prisma/client';

import { CountryStatus } from 'src/types/country/types';

export class CountryEntity implements Country {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: Record<string, any>;

  @ApiProperty()
  hasAreas: boolean;

  @ApiProperty()
  url: Record<string, any> | null;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  status: CountryStatus;

  @ApiProperty()
  icon: string | null;
}
