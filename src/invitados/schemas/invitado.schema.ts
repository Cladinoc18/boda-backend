import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type InvitadoDocument = Invitado & Document;

@Schema({ collection: 'invitados', timestamps: true })
export class Invitado {
  @Prop({ required: true, trim: true })
  nombre: string;

  @Prop({ required: false, trim: true })
  email: string;

  @Prop({ required: false, trim: true })
  telefono: string;

  @Prop({ required: true })
  asistira: boolean;

  @Prop({ required: false, enum: ['Arroz de camarones', 'Pescado', 'Frichi', 'Pechuga gratinada'] })
  comida: string; // Elección de plato principal para el invitado

  @Prop({ required: false, trim: true })
  restriccionesAlimenticias: string;

  @Prop({ required: false, trim: true })
  mensaje: string;

  // Canciones sugeridas (ej: ["Artista - Título"])
  @Prop({ type: [String], default: [] })
  cancionesSugeridas: string[];
}

export const InvitadoSchema = SchemaFactory.createForClass(Invitado);
