import { IsString, IsNotEmpty, IsOptional, IsIn } from 'class-validator';

export class CreateImageDto {
  @IsString({ message: 'La URL de la imagen debe ser texto.' })
  @IsNotEmpty({ message: 'La URL de la imagen es requerida.' })
  url: string;

  @IsString({ message: 'El publicId del almacenamiento debe ser texto.' })
  @IsNotEmpty({ message: 'El publicId es requerido.' })
  publicId: string;

  @IsString({ message: 'La sección debe ser texto.' })
  @IsOptional()
  @IsIn(['oficiales', 'invitados'], { message: 'La sección debe ser "oficiales" o "invitados".' })
  seccion?: string;

  @IsString({ message: 'El nombre de quien sube la foto debe ser texto.' })
  @IsNotEmpty({ message: 'Debes ingresar tu nombre para subir la foto.' })
  subidoPor: string;

  @IsString({ message: 'El PIN de seguridad debe ser texto.' })
  @IsNotEmpty({ message: 'Debes proporcionar el PIN de la invitación.' })
  pin: string;
}
