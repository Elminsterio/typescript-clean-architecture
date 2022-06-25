import { GetUsersUseCaseI } from "Domain/UseCases/User/GetUsers";
import { CreateUserUseCaseI } from "Domain/UseCases/User/CreateUser";
import { Request, Response } from "express";
import { User } from "Domain/Entities/User";
import { UserControllerI } from "../Interfaces/Controllers/userControllerInterface";
import { validationResult } from 'express-validator';
import { MultipleValidationDataError } from "Domain/Entities/Errors";

export class UserController implements UserControllerI<Request, Response> {
  getUserUseCase: GetUsersUseCaseI;
  createUserUseCase: CreateUserUseCaseI

  constructor(
    _getUserUseCase: GetUsersUseCaseI,
    _createUserUseCase: CreateUserUseCaseI
  ) {
    this.getUserUseCase = _getUserUseCase;
    this.createUserUseCase = _createUserUseCase
  }

  async getUsers(req: Request, res: Response) {
    return await this.getUserUseCase.invoke();
  }
  
  async createUser(req: Request, res: Response) {
    const errors = validationResult(req);
    const messageError = JSON.stringify(errors.array());

    if(!errors.isEmpty()) throw new MultipleValidationDataError(messageError);
      
    const {email, name, password} = req.body;
    const user: User = {email, name, password};
    return await this.createUserUseCase.invoke(user);
  }
}