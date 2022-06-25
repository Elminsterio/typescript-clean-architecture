import { UserRoutes } from "./User/userRoutes";
import { Express, Application } from "express";
import { UserController } from "../Controllers/userController";
import { GetUsersUseCase } from "Domain/UseCases/User/GetUsers";
import { CreateUserUseCase } from "Domain/UseCases/User/CreateUser";
import { UsersRepository } from "Domain/Repositories/UsersRepository";
import { RoutesRegisterI } from "../Interfaces/Routes/routesRegisterInterface";
import { AuthController } from "../Controllers/authController";
import { LoginUseCase } from "Domain/UseCases/Auth/Login";
import { AuthRoutes } from "./Auth/authRoutes";
import { UpdateUserUseCase } from "Domain/UseCases/User/UpdateUser";
import { DeleteUserUseCase } from "Domain/UseCases/User/DeleteUser";
import { GetUserByIdUseCase } from "Domain/UseCases/User/GetUserById";


export class RoutesRegister implements RoutesRegisterI {
  app: Express;

  constructor(
    app: Express,
  ) {
    this.app = app;
  }

  public registerAllRoutes(): Application {
    
    const userRepo: UsersRepository = UserRoutes.userRepo;
    const userUseCases = {
      getUser: new GetUsersUseCase(userRepo),
      createUser: new CreateUserUseCase(userRepo),
      updateUser: new UpdateUserUseCase(userRepo),
      deleteUser: new DeleteUserUseCase(userRepo),
      getUserById: new GetUserByIdUseCase(userRepo)
    }
    const loginUseCases = {
      login: new LoginUseCase(userRepo)
    }
    const userCont: UserController = new UserController(userUseCases.getUser, 
                                                        userUseCases.createUser,
                                                        userUseCases.updateUser,
                                                        userUseCases.deleteUser,
                                                        userUseCases.getUserById);

    const userRoutes: UserRoutes = new UserRoutes(userCont);

    const authCont: AuthController = new AuthController(loginUseCases.login);
    const authRoutes: AuthRoutes = new AuthRoutes(authCont);
    
    this.app.use('/api/user', userRoutes.registerRoutes());
    this.app.use('/api/auth', authRoutes.registerRoutes());

    return this.app;
  }
}