import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Gallery, GalleryDocument } from './schemas/gallery.schema';
import { CreateImageDto } from './dto/create-image.dto';

@Injectable()
export class GalleryService {
  private readonly ADMIN_PIN = 'BODAADMIN2026';
  private readonly GUEST_PIN = 'BODAMAYAPO2026';
  private readonly MAX_UPLOADS_PER_HOUR = 15;

  constructor(
    @InjectModel(Gallery.name)
    private readonly galleryModel: Model<GalleryDocument>,
  ) {}

  // Registrar una foto subida determinando sección y aprobación por el PIN
  async create(createImageDto: CreateImageDto, ipOrigen?: string): Promise<Gallery> {
    const pinIngresado = createImageDto.pin.trim().toUpperCase();
    
    let seccion: 'oficiales' | 'invitados';
    let aprobado = false;

    // 1. Validar PIN y asignar sección + estado de aprobación
    if (pinIngresado === this.ADMIN_PIN) {
      seccion = 'oficiales';
      aprobado = true; // Las fotos oficiales de los novios/fotógrafo se aprueban inmediatamente
    } else if (pinIngresado === this.GUEST_PIN) {
      seccion = 'invitados';
      aprobado = false; // Las fotos de los invitados requieren aprobación previa
    } else {
      throw new UnauthorizedException('El PIN de la invitación es inválido. Por favor, revísalo.');
    }

    // 2. Control de carga masiva (Anti-spam): límite de 15 fotos por hora por usuario/IP
    const unaHoraAtras = new Date(Date.now() - 60 * 60 * 1000);
    const filterQuery: any = {
      $or: [
        { subidoPor: createImageDto.subidoPor.trim() }
      ],
      createdAt: { $gte: unaHoraAtras }
    };

    if (ipOrigen) {
      filterQuery.$or.push({ ipOrigen });
    }

    const fotosSubidas = await this.galleryModel.countDocuments(filterQuery);

    if (fotosSubidas >= this.MAX_UPLOADS_PER_HOUR) {
      throw new BadRequestException(
        `Has excedido el límite de subida (${this.MAX_UPLOADS_PER_HOUR} fotos por hora). Inténtalo más tarde.`
      );
    }

    // 3. Crear y guardar el registro
    const nuevaFoto = new this.galleryModel({
      url: createImageDto.url,
      publicId: createImageDto.publicId,
      seccion: seccion, // Auto-determinado por el PIN
      subidoPor: createImageDto.subidoPor.trim(),
      ipOrigen: ipOrigen,
      aprobado: aprobado // Auto-determinado por el PIN
    });

    return nuevaFoto.save();
  }

  // Obtener todas las fotos de la galería (aprobadas)
  async findAll(): Promise<Gallery[]> {
    return this.galleryModel.find({ aprobado: true }).sort({ createdAt: -1 }).exec();
  }

  // Obtener fotos por sección
  async findBySection(seccion: string): Promise<Gallery[]> {
    return this.galleryModel.find({ seccion, aprobado: true }).sort({ createdAt: -1 }).exec();
  }
}
