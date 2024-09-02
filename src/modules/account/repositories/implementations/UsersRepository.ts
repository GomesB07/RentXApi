import { Repository } from 'typeorm';
import { User } from '../../entities/User';
import { AppDataSource } from '../../../../database';
import { ICreateUserDTO } from '../../dtos/ICreateUserDTO';
import { IUsersRepository } from '../IUsersRepository';

class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = AppDataSource.getRepository(User);
  }

  async create({ id, name, email, password, driver_license, avatar }: ICreateUserDTO): Promise<void> {
    const user = this.repository.create({ id, name, email, password, driver_license, avatar });

    await this.repository.save(user);
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.repository.findOne({ where: { email } });
    return user;
  }

  async findById(id: string): Promise<User> {
    const user = await this.repository.findOne({ where: { id } });

    return user;
  }
}

export { UsersRepository };
