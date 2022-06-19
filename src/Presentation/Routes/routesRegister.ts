import { UserRoutes } from "./User/userRoutes";
import { Router, Application } from "express";
import { userController } from "../Controllers/userController";
import { GetUsersUseCase } from "../../Domain/UseCases/User/GetUsers";
import { CreateUserUseCase } from "../../Domain/UseCases/User/CreateUser";
import { UsersRepository } from "../../Domain/Repositories/UsersRepository";
import { RoutesRegisterI } from "../Interfaces/Routes/routesRegisterInterface";


export class RoutesRegister implements RoutesRegisterI {
  router: Router;
  app: Application;

  constructor(
    app: Application,
    router: Router
  ) {
    this.app = app
    this.router = router;
  }

  public registerAllRoutes(): Router {
    const userRepo: UsersRepository = UserRoutes.userRepo;
    const userUseCases = {
      getUser: new GetUsersUseCase(userRepo),
      createUser: new CreateUserUseCase(userRepo)
    }
    const userCont: userController = new userController(userUseCases.getUser, 
                                                        userUseCases.createUser)
    const userRoutes: UserRoutes = new UserRoutes(userCont);
    
    userRoutes.registerRoutes(this.app, this.router);
    
    return this.router;
  }

  

}