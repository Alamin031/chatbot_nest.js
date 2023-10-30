import { ApiProperty } from '@nestjs/swagger';
import { Asists } from '@prisma/client';

export class AsistsEntity implements Asists {
  constructor(partial: Partial<AsistsEntity>) {
    Object.assign(this, partial);
  }
  @ApiProperty({
    description: 'Asists id',
    example: '1',
  })
  id: number;
  @ApiProperty({
    description: 'Asists fileType',
    example: 'image',
  })
  fileType: string;
  @ApiProperty({
    description: 'Asists tags',
    example: 'tags',
  })
  tags: string[];
  @ApiProperty({
    description: 'Asists height',
    example: '100',
  })
  height: number;
  @ApiProperty({
    description: 'Asists width',
    example: '100',
  })
  width: number;
  @ApiProperty({
    description: 'Asists slug',
    example: 'slug',
  })
  slug: string;
  @ApiProperty({
    description: 'Asists fileName',
    example: 'fileName',
  })
  fileName: string;
  @ApiProperty({
    description: 'Asists mimeType',
    example: 'mimeType',
  })
  mimeType: string;
  @ApiProperty({
    description: 'Asists fileSize',
    example: '100',
  })
  fileSize: number;
  @ApiProperty({
    description: 'Asists createdBy',
    example: '1',
  })
  createdBy: number;
  @ApiProperty({
    description: 'Asists createdAt',
    example: '2021-10-10T06:25:46.000Z',
  })
  createdAt: Date;
  @ApiProperty({
    description: 'isImage',
    example: 'true',
  })
  isImage: boolean;
  @ApiProperty({
    description: 'Asists adminid',
    example: '1',
  })
  adminid: number;
  @ApiProperty({
    description: 'Asists updatedAt',
    example: '2021-10-10T06:25:46.000Z',
  })
  updatedAt: Date;
}
