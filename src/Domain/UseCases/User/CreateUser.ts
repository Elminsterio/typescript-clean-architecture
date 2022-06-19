import { User } from '../../Entities/User';
import { UsersRepository } from '../../Repositories/UsersRepository';

export interface CreateUserUseCaseI {
  invoke: (user: User) => Promise<User>
}

export class CreateUserUseCase implements CreateUserUseCaseI {
  public usersRepository: UsersRepository;
  
  constructor(_userRepository: UsersRepository) {
    this.usersRepository = _userRepository;
  }

  public async invoke(user: User) {
    return await this.usersRepository.create(user);
  } 
}