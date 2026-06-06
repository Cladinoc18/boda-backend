import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { InvitadosController } from './invitados.controller';
import { InvitadosService } from './invitados.service';
import { Invitado, InvitadoSchema } from './schemas/invitado.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Invitado.name, schema: InvitadoSchema }]),
  ],
  controllers: [InvitadosController],
  providers: [InvitadosService],
  exports: [InvitadosService], // Exportamos para si otros módulos necesitan consultar invitados
})
export class InvitadosModule {}
