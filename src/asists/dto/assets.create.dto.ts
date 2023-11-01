import { IsString, IsNumber, IsBoolean, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAssetDto {
  @IsString()
  @ApiProperty()
  fileType: string;

  @IsString({ each: true })
  @ApiProperty()
  tags: string[];

  @IsNumber()
  @ApiProperty()
  height: number;

  @IsNumber()
  @ApiProperty()
  width: number;

  @IsString()
  @ApiProperty()
  slug: string;

  @IsString()
  @ApiProperty()
  fileName: string;

  @IsString()
  @ApiProperty()
  mimeType: string;

  @IsNumber()
  @ApiProperty()
  fileSize: number;

  @IsBoolean()
  @ApiProperty()
  isImage: boolean;

  @IsNumber()
  @ApiProperty()
  createdBy: number | null;

  // Add the 'country' property if it's required
  @IsNumber()
  @ApiProperty()
  country?: number;
}
