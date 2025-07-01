import { ConflictException, Injectable } from "@nestjs/common";
import { User } from "src/models/user";
import { hashSync } from "bcrypt";
import { v4 as uuid } from "uuid";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "src/db/entities/user.entity";
import { Repository } from "typeorm";
import { PassThrough } from "stream";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) {}

  private users: User[] = [];

  async create(newUser: User) {
    const existentUser = await this.findByUsername(newUser.username)

    if(existentUser)
      throw new ConflictException(`User ${newUser.username} already exists.`)

    const dbUser = new UserEntity()
    dbUser.username = newUser.username
    dbUser.passwordHash = hashSync(newUser.password, 10)

    const response = await this.userRepository.save(dbUser)
    return {id: response.id, username: response.username, password: response.passwordHash};

  }

  async findById(id: string): Promise<User | null> {
    const userFound = await this.userRepository.findOne({where: {id}});

    if(!userFound)
      return null;

    return {
      id: userFound!.id,
      username: userFound!.username,
      password: userFound!.passwordHash
  }
}

  async findByUsername(username: string): Promise<User | null> {
    const userFound = await this.userRepository.findOne({where: {username}});

    if(!userFound)
      return null;

    return {
      id: userFound!.id,
      username: userFound!.username,
      password: userFound!.passwordHash
    }
  }
}
