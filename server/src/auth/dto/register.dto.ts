import {
  IsEmail,
  IsString,
  MinLength,
  IsOptional,
  IsArray,
  MaxLength,
  Matches,
} from 'class-validator';

/** Public registration is for students only. Admin/Instructor are added by SA (or A) via create-user. */
export class RegisterDto {
  @IsString()
  @MinLength(1)
  @Matches(/^[a-zA-Z\s]+$/, { message: 'First name must contain only letters and spaces' })
  firstName: string;

  @IsString()
  @MinLength(1)
  @Matches(/^[a-zA-Z\s]+$/, { message: 'Last name must contain only letters and spaces' })
  lastName: string;

  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  phoneCountry?: string;

  @IsOptional()
  @IsString()
  @Matches(/^[0-9]{10}$/, { message: 'Phone number must be 10 digits' })
  phoneNumber?: string;

  @IsOptional()
  @IsString()
  underGraduate?: string;

  @IsOptional()
  @IsString()
  profileImageUrl?: string;

  @IsOptional()
  @IsString()
  resumeUrl?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  skills?: string[];

  @IsString()
  @MinLength(8, { message: 'Password must be at least 8 characters' })
  @MaxLength(128)
  password: string;
}
