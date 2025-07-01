import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async (configService: ConfigService) => {
        return {
          type: "postgres",
          host: configService.get<string>("DB_HOST") || "localhost",
          username: configService.get<string>("DB_USER") || "postgres",
          port: configService.get<number>("DB_PORT") || 5433,
          database:
            configService.get<string>("DB_DATABASE") || "task-management-api",
          password: String(
            configService.get<string>("DB_PASSWORD") || "12345678"
          ),
          entities: [__dirname + "/entities/**/*.{ts,js}"],
          migrations: [__dirname + "/migrations/*.{ts,js}"],
          synchronize: false,
          ssl: false,
          logging: true, // Enable logging to see SQL queries
          extra: {
            trustServerCertificate: true,
          },
        };
      },
      inject: [ConfigService],
    }),
  ],
})
export class DbModule {}
