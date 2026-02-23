import { IsString, MinLength, MaxLength } from 'class-validator';

export class UpdateProfileDto {
  @IsString()
  @MinLength(1, { message: 'First name is required' })
  @MaxLength(128)
  firstName: string;

  @IsString()
  @MinLength(1, { message: 'Last name is required' })
  @MaxLength(128)
  lastName: string;
}
