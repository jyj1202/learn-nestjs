import { IsString, IsEnum, IsArray } from 'class-validator';
import { UserRole } from "../entities/user.entity";

export class CreateUserDto {
  @IsString()
  username: string;

  @IsString()
  password: string;

  @IsArray()
  @IsEnum(UserRole, { each: true })
  role: UserRole[] = [UserRole.GHOST];
}
