import {
  IsEmail,
  IsString,
  MinLength,
  IsOptional,
  IsIn,
  MaxLength,
  Matches,
} from 'class-validator';

/** Roles that SA (and A) can create via create-user. Students use public registration only. */
export const CREATE_USER_ROLES = ['admin', 'instructor'] as const;

export class CreateUserDto {
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

  /** Optional. If omitted, user receives set-password email and must set password before login. */
  @IsOptional()
  @IsString()
  @MinLength(8, { message: 'Password must be at least 8 characters' })
  @MaxLength(128)
  password?: string;

  @IsString()
  @IsIn(CREATE_USER_ROLES, { message: 'Role must be one of: admin, instructor' })
  role: string;

  @IsOptional()
  @IsString()
  phoneCountry?: string;

  @IsOptional()
  @IsString()
  @Matches(/^[0-9]{10}$/, { message: 'Phone number must be 10 digits' })
  phoneNumber?: string;
}
