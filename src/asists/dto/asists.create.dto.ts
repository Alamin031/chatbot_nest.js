import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber } from 'class-validator';

export class CreateAsistsDto {
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

  @ApiProperty()
  @IsNumber()
  createdBy?: number;
}
