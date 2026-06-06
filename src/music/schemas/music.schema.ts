import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MusicDocument = Music & Document;

@Schema({ collection: 'canciones_sugeridas', timestamps: true })
export class Music {
  @Prop({ required: true, trim: true })
  titulo: string;

  @Prop({ required: true, trim: true })
  artista: string;

  @Prop({ required: false, trim: true, default: 'Invitado Anónimo' })
  sugeridoPor: string;
}

export const MusicSchema = SchemaFactory.createForClass(Music);
