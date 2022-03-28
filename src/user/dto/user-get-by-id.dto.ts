import { IsNotEmpty, IsString } from 'class-validator';

export class GetUserByIdDTO {
  @IsString()
  @IsNotEmpty()
  id: string;
}
