import { Injectable } from "@nestjs/common";
import { User } from "src/models/user";
import { hashSync } from "bcrypt";
import { v4 as uuid } from "uuid";

@Injectable()
export class UsersService {
  private users: User[] = [
    {
      id: "123",
      username: "Teste",
      password: "senha",
    },
  ];

  create(newUser: User) {
    newUser.id = uuid();
    newUser.password = hashSync(newUser.password, 10);

    this.users.push(newUser);
    console.log(this.users)
  }

  findById(id: string) : User | undefined {
    return this.users.find(u => u.id === id);
  }
}
