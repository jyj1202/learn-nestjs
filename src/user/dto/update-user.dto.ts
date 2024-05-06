import { IsString, IsOptional, IsEnum, IsArray } from 'class-validator';
import { UserRole } from "../entities/user.entity";

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  username?: string;

  @IsArray()
  @IsEnum(UserRole, { each: true })
  @IsOptional()
  role?: UserRole[];
}
