import { IsString, MinLength, MaxLength } from 'class-validator';

export class SetPasswordDto {
  @IsString()
  token: string;

  @IsString()
  @MinLength(8, { message: 'Password must be at least 8 characters' })
  @MaxLength(128)
  newPassword: string;
}
