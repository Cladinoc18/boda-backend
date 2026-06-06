import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type GalleryDocument = Gallery & Document;

@Schema({ collection: 'galeria', timestamps: true })
export class Gallery {
  @Prop({ required: true, trim: true })
  url: string;

  @Prop({ required: true, trim: true })
  publicId: string; // Identificador en Cloudinary o S3

  @Prop({ required: true, enum: ['oficiales', 'invitados'], default: 'invitados' })
  seccion: string; // Clasificación de la foto

  @Prop({ required: true, trim: true })
  subidoPor: string;

  @Prop({ required: true, default: false })
  aprobado: boolean; // Requiere moderación, por defecto false

  @Prop({ required: false, trim: true })
  ipOrigen: string; // IP del cargador para prevención de spam
}

export const GallerySchema = SchemaFactory.createForClass(Gallery);
