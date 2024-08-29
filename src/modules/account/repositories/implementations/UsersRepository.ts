import { Repository } from 'typeorm';
import { User } from '../../entities/User';
import { AppDataSource } from '../../../../database';
import { ICreateUserDTO } from '../../dtos/ICreateUserDTO';

class UsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = AppDataSource.getRepository(User);
  }

  async create({ name, email, password, driver_license }: ICreateUserDTO): Promise<void> {
    const user = this.repository.create({ name, email, password, driver_license });

    await this.repository.save(user);
  }
}

export { UsersRepository };
