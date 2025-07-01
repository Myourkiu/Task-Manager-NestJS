import { ConfigService } from "@nestjs/config";
import { config } from "dotenv";
import { DataSource, DataSourceOptions } from "typeorm";

config();

const configService = new ConfigService();

const dataSourceOptions: DataSourceOptions = {
  type: "postgres",
  host: configService.get<string>("DB_HOST") || "localhost",
  username: configService.get<string>("DB_USER") || "postgres",
  port: configService.get<number>("DB_PORT") || 5433,
  database: configService.get<string>("DB_DATABASE") || "task-management-api",
  password: String(configService.get<string>("DB_PASSWORD") || "12345678"),
  entities: [],
  migrations: [__dirname + "/migrations/*.{ts,js}"],
  synchronize: false
};

export default new DataSource(dataSourceOptions)