import { getRepository, Repository } from 'typeorm';
import { Specification } from '../../entities/Specification';
import { ICreateSpecificationDTO, ISpecificationsRepository } from '../ISpecificationsRepository';
import { AppDataSource } from '../../../../database';

class SpecificationsRepository implements ISpecificationsRepository {
  private repository: Repository<Specification>;

  constructor() {
    this.repository = AppDataSource.getRepository(Specification);
  }

  async create({ name, description }: ICreateSpecificationDTO): Promise<void> {
    const specification = this.repository.create({
      name,
      description,
    });

    await this.repository.save(specification);
  }

  async list(): Promise<Specification[]> {
    const allSpecifications = await this.repository.find();
    return allSpecifications;
  }

  async findByName(name: string): Promise<Specification> {
    const specificationAlreadyExists = await this.repository.findOneBy({ name });
    return specificationAlreadyExists;
  }
}

export { SpecificationsRepository };
