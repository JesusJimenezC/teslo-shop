import { IsOptional, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class PaginationDto {
  @ApiProperty({
    required: false,
    type: Number,
    description:
      'The maximum number of items to return. If not set, the default limit does not exist and the number of items returned will be all items in the collection.',
  })
  @IsOptional()
  @Min(1)
  @Type(() => Number)
  limit?: number;

  @ApiProperty({
    required: false,
    type: Number,
    description:
      'The number of items to skip before starting to collect the result set.',
  })
  @IsOptional()
  @Min(0)
  @Type(() => Number)
  offset?: number;
}
