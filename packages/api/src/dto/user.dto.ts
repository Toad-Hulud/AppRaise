import { IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateUserDto {
  @IsString()
  name!: string;
}

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  name?: string;
}
export class UpdateUserManagerDto {
  @IsUUID()
  managerId?: string;
}
