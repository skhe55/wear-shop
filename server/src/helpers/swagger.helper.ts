import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

export class SwaggerHelper {
    public integrationSwaggerDocs (applicationInstance) {
        const config = new DocumentBuilder()
            .setTitle('Wear-shop-API')
            .setDescription('Документация api магазина одежды')
            .setVersion('1.0')
            .build();
        
            const document = SwaggerModule.createDocument(applicationInstance, config, {
                ignoreGlobalPrefix: false
            });
            SwaggerModule.setup('/swagger-doc', applicationInstance, document);
    }
}