import { Router, Application } from "express";

export interface RoutesRegisterI {
  router: Router;
  app: Application;
  registerAllRoutes: () => Router
}
