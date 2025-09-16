import { Transform } from 'class-transformer';
import { IsOptional, IsString, IsDateString, IsBoolean } from 'class-validator';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

export class FindUsersDto extends PaginationDto {
  @IsOptional()
  @IsString()
  @Transform(({ value }) => value?.trim() || undefined)
  search?: string;

  @IsOptional()
  @IsDateString()
  @Transform(({ value }) => value || undefined)
  createdStart?: string;

  @IsOptional()
  @IsDateString()
  @Transform(({ value }) => value || undefined)
  createdEnd?: string;

  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => {
    if (value === 'true') return true;
    if (value === 'false') return false;
    return undefined; // not specified
  })
  status?: boolean;
}
