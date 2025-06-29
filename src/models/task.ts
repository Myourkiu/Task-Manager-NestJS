import { IsDateString, IsEnum, IsOptional, IsString, IsUUID, MaxLength, MinLength } from "class-validator";

export enum TaskStatus {
  TO_DO = 'TO_DO',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}

export class Task {
  @IsUUID()
  @IsOptional()
  id: string;
  @IsString()
  @MinLength(3)
  @MaxLength(256)
  title: string;
  @IsString()
  @MinLength(3)
  @MaxLength(512)
  description: string;

  @IsEnum(TaskStatus)
  @IsOptional()
  status: string;
  @IsDateString()
  expirationDate: Date;
}

export interface IFindAllTasksParams {
  title: string;
  status: string;
}
