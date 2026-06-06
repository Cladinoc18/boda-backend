import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { InvitadosModule } from './invitados/invitados.module';
import { MusicModule } from './music/music.module';
import { GalleryModule } from './gallery/gallery.module';

@Module({
  imports: [
    // Conectar a MongoDB. Usa la variable de entorno MONGO_URI si existe, o local por defecto
    MongooseModule.forRoot(
      process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/wedding_db',
    ),
    InvitadosModule,
    MusicModule,
    GalleryModule,
  ],
})
export class AppModule {}
