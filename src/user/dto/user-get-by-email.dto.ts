import { IsEmail, IsNotEmpty } from 'class-validator';

export class GetUserByEmailDTO {
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
