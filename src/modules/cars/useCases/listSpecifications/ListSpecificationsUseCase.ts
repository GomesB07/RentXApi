import { inject, injectable } from 'tsyringe';
import { Specification } from '../../entities/Specification';
import { ISpecificationsRepository } from '../../repositories/ISpecificationsRepository';

@injectable()
class ListSpecificationsUseCase {
  constructor(
    @inject('SpecificationsRepository')
    private specificationsRepository: ISpecificationsRepository,
  ) {}

  execute(): Promise<Specification[]> {
    const allSpecifications = this.specificationsRepository.list();
    return allSpecifications;
  }
}

export { ListSpecificationsUseCase };
