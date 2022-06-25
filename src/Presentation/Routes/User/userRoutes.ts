import { Request, Response, Router, NextFunction } from 'express';
import { UserRepositoryImpl } from 'Data/Repositories/UserRepositoryImpl';
import UserMongoDataSourceImpl from 'Data/DataSources/UserMongoDataSource';
import { UserModel } from 'Data/DataSources/Mongodb/MongoModels/UserSchema';
import { UserControllerI } from '../../Interfaces/Controllers/userControllerInterface';
import { UserRoutesI } from '../../Interfaces/Routes/User/userRoutesInterface';
import createUserValidator from '../../Validators/userValidator';


export class UserRoutes implements UserRoutesI {
  static userRepo = new UserRepositoryImpl(new UserMongoDataSourceImpl(new UserModel()))
  private userController: UserControllerI<Request, Response> 

  constructor(
    _userController: UserControllerI<Request, Response>
  ) {
    this.userController = _userController;
  }

  public registerRoutes(): Router {
    const router = Router();
    const installGetUsersRoute = (req: Request, res: Response, next: NextFunction) => this.getUsers(req, res, next);
    router.get('/', installGetUsersRoute);
    const installCreateUsersRoute = (req: Request, res: Response, next: NextFunction) => this.createUser(req, res, next);
    router.post('/', createUserValidator, installCreateUsersRoute);

    return router;
  }
  
  async getUsers(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const users = await this.userController.getUsers(req, res);
      return res.json({results: users});
    } catch(error) {
      return next(error);
    }
  }

  async createUser(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const user = await this.userController.createUser(req, res);
      return res.json({result: user});
    } catch(error) {
      return next(error);
    }
  }
} 