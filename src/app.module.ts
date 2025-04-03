// src/app.module.ts
import { Module } from "@nestjs/common";
import { AppService } from "./app.service";
import { databaseConfig } from "./configs/data.config";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ManagementAppImports } from "./configs/imports.config";

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      useFactory: () => databaseConfig()
    }),
    ...ManagementAppImports
  ],
  controllers: [],
  providers: [AppService]
})
export class AppModule {}
