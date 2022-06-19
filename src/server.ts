import { json, urlencoded } from 'body-parser';
import mongoose from 'mongoose';
import express, { Router, Express, ErrorRequestHandler } from 'express';
import * as http from 'http';
import { RoutesRegister } from './Presentation/Routes/routesRegister';
import { ErrorHandler } from './Presentation/ErrorHandlers/ErrorHandler';

export class Server {
  private express: Express;
  private router: Router;
  private port: string;
  private httpServer?: http.Server;
  //constructor(config)
  constructor(port: string) {
    this.port = port;
    this.express = express();
    this.express.use(json());
    this.express.use(urlencoded({ extended: true }));

    this.router = express.Router();
    new RoutesRegister(this.express, this.router).registerAllRoutes();
  
    this.express.use(ErrorHandler.manageError as ErrorRequestHandler);
  }

  async listen(): Promise<void> {
    return new Promise(resolve => {
      this.httpServer = this.express.listen(this.port, () => {
        console.log(
          `  Mock Backend App is running at http://localhost:${this.port} in ${this.express.get('env')} mode`
        );
        console.log('  Press CTRL-C to stop\n');
        resolve();
      });
      mongoose.connect('mongodb://localhost:27017/OneTest');
    });
  }

  getHTTPServer() {
    return this.httpServer;
  }

  async stop(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.httpServer) {
        this.httpServer.close(error => {
          if (error) {
            return reject(error);
          }
          return resolve();
        });
      }
      return resolve();
    });
  }
}