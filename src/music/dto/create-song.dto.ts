import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateSongDto {
  @IsString({ message: 'El título de la canción debe ser texto.' })
  @IsNotEmpty({ message: 'El título de la canción es requerido.' })
  titulo: string;

  @IsString({ message: 'El nombre del artista debe ser texto.' })
  @IsNotEmpty({ message: 'El nombre del artista es requerido.' })
  artista: string;

  @IsString({ message: 'El nombre de quien sugiere debe ser texto.' })
  @IsNotEmpty({ message: 'Debes ingresar tu nombre para sugerir la canción.' })
  sugeridoPor: string;
}
