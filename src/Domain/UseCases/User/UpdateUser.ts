import { User } from '../../Entities/User';
import { UsersRepository } from '../../Repositories/UsersRepository';

export interface UpdateUserUseCaseI {
  invoke: (id: User['_id'], user: User) => Promise<User>
}

export class UpdateUserUseCase implements UpdateUserUseCaseI {
  public usersRepository: UsersRepository;
  
  constructor(_userRepository: UsersRepository) {
    this.usersRepository = _userRepository;
  }

  public async invoke(id: User['_id'], user: User) {
    return await this.usersRepository.edit(id, user);
  } 
}