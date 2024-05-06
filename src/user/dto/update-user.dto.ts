import { IsString, IsUUID, IsOptional, IsEnum, IsDate, IsArray } from 'class-validator';
import { UserRole } from "../entities/user.entity";

export class UpdateUserDto {
  @IsUUID()
  id: string;

  @IsString()
  @IsOptional()
  username?: string;

  @IsArray()
  @IsEnum(UserRole, { each: true })
  @IsOptional()
  role?: UserRole[];
}
