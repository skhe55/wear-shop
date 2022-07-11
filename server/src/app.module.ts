import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { RolesModule } from './roles/roles.module';
import { UsersModule } from './users/users.module';
import { WearModule } from './wear/wear.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.gen.env',
      isGlobal: true
    }),
    ServeStaticModule.forRoot({
      serveRoot: "/static",
      rootPath: path.resolve(__dirname, 'static'),
    }),
    DatabaseModule,
    WearModule,
    RolesModule,
    UsersModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
