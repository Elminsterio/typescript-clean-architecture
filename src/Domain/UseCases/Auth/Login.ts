import { User } from "../../Entities/User";
import { UsersRepository } from "../../Repositories/UsersRepository";
import { ErrorPwdOrUserNotFound } from "../../Entities/Errors";
import jwt from 'jsonwebtoken';
import bcryptjs from 'bcryptjs';

export interface LoginUseCaseI {
  invoke: (email: User['email'], password: User['password']) => object
}

export class LoginUseCase implements LoginUseCaseI {
  public usersRepository: UsersRepository;
  
  constructor(_userRepository: UsersRepository) {
    this.usersRepository = _userRepository;
  }

  public async invoke(email: User['email'], password: User['password']) {
    const userExist: User = await this.usersRepository.getByEmail(email);
    if (!userExist) throw new ErrorPwdOrUserNotFound('Password or user is incorrect');

    const correctPassword = await bcryptjs.compare(password, userExist.password);
    if(!correctPassword) throw new ErrorPwdOrUserNotFound('Password or user is incorrect');
   
    const token = jwt.sign({...userExist}, 'secret', {expiresIn: 300});
    return { token, userExist }
  } 
}