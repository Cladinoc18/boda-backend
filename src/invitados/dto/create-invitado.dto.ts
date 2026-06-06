import { IsString, IsNotEmpty, IsEmail, IsOptional, IsBoolean, IsArray, IsIn } from 'class-validator';

export class CreateInvitadoDto {
  @IsString({ message: 'El nombre debe ser un texto.' })
  @IsNotEmpty({ message: 'El nombre completo es requerido.' })
  nombre: string;

  @IsEmail({}, { message: 'El correo electrónico debe tener un formato válido.' })
  @IsOptional()
  email?: string;

  @IsString({ message: 'El teléfono debe ser un texto.' })
  @IsOptional()
  telefono?: string;

  @IsBoolean({ message: 'El estado de asistencia debe ser verdadero o falso.' })
  @IsNotEmpty({ message: 'Debes confirmar si asistirás o no.' })
  asistira: boolean;

  @IsString({ message: 'La elección de comida debe ser un texto.' })
  @IsOptional()
  @IsIn(['Arroz de camarones', 'Pescado', 'Frichi', 'Pechuga gratinada'], { message: 'La elección de comida debe ser Arroz de camarones, Pescado, Frichi o Pechuga gratinada.' })
  comida?: string;

  @IsString({ message: 'Las restricciones alimenticias deben ser texto.' })
  @IsOptional()
  restriccionesAlimenticias?: string;

  @IsString({ message: 'El mensaje debe ser texto.' })
  @IsOptional()
  mensaje?: string;

  @IsArray({ message: 'Las canciones sugeridas deben enviarse en formato de lista.' })
  @IsString({ each: true, message: 'Cada canción sugerida debe ser un texto.' })
  @IsOptional()
  cancionesSugeridas?: string[];
}
