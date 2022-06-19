import { User } from "../../../Domain/Entities/User";

export interface userControllerI<T, P> {
  getUsers: (req: T, res: P) => Promise<User[]>
  createUser: (req: T, res: P) => Promise<User>
}