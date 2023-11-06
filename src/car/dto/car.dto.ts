import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class CarDTO {
  @ApiProperty()
  carName: string;
  @ApiProperty()
  description: string | null;
}

export class CarUploadDTO {
  @ApiProperty()
  @IsString()
  carName: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  description?: string;
}
