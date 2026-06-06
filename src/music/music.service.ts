import { Injectable, UnauthorizedException, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Music, MusicDocument } from './schemas/music.schema';
import { CreateSongDto } from './dto/create-song.dto';

@Injectable()
export class MusicService {
  private readonly ADMIN_PIN = 'BODAADMIN2026';

  constructor(
    @InjectModel(Music.name)
    private readonly musicModel: Model<MusicDocument>,
  ) {}

  // Guardar una sugerencia de canción con límite de 2 por persona
  async create(createSongDto: CreateSongDto): Promise<Music> {
    const nombreNormalizado = createSongDto.sugeridoPor.trim();

    // Validar cantidad máxima de canciones sugeridas por persona
    const cancionesPrevias = await this.musicModel.countDocuments({
      sugeridoPor: { $regex: new RegExp(`^${nombreNormalizado}$`, 'i') } // Búsqueda insensible a mayúsculas
    }).exec();

    if (cancionesPrevias >= 2) {
      throw new BadRequestException(
        `Lo sentimos, "${createSongDto.sugeridoPor}" ya ha sugerido el límite máximo de 2 canciones.`
      );
    }

    const nuevaCancion = new this.musicModel({
      titulo: createSongDto.titulo,
      artista: createSongDto.artista,
      sugeridoPor: nombreNormalizado
    });
    return nuevaCancion.save();
  }

  // Obtener todas las sugerencias de música
  async findAll(): Promise<Music[]> {
    return this.musicModel.find().sort({ createdAt: -1 }).exec();
  }

  // Eliminar una sugerencia de canción validando el PIN del administrador
  async remove(id: string, pin: string): Promise<boolean> {
    if (!pin || pin.trim().toUpperCase() !== this.ADMIN_PIN) {
      throw new UnauthorizedException('El PIN de administrador es inválido.');
    }
    const result = await this.musicModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException('La canción sugerida no existe en la base de datos.');
    }
    return true;
  }
}
