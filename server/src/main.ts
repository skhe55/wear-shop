import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from './pipes/validation.pipe';
import { SwaggerHelper } from './helpers/swagger.helper';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

const PORT = 3001;
const swagger = new SwaggerHelper();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  swagger.integrationSwaggerDocs(app);

  await app.listen(PORT, '0.0.0.0');
}
bootstrap().then(() => console.log(`Server starting on ${PORT} port.`));
