import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Habilitar CORS para permitir peticiones del frontend de Angular
  app.enableCors({
    origin: ['http://localhost:4200', 'https://tu-boda-frontend.vercel.app'], // Orígenes permitidos (desarrollo y producción)
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  // Configurar tubería de validación global
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Remueve propiedades que no tengan decoradores en el DTO
      forbidNonWhitelisted: true, // Lanza error si se envían propiedades no permitidas
      transform: true, // Transforma automáticamente payloads a los tipos del DTO
    }),
  );

  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`Backend de Matrimonio ejecutándose en: http://localhost:${port}`);
}
bootstrap();
