import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],
  exports: [UsersService], //deixa explicito que pode ser importado em outro modulo
  providers: [UsersService]
})
export class UsersModule {}
