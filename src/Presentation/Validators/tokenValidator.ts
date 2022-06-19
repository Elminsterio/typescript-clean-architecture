import { UnathorizedError } from "../../Domain/Entities/Errors";
import jwt from 'jsonwebtoken';

export class TokenValidator {

  static verifyBearerToken(bearerToken: string) {
    if(!bearerToken) throw new UnathorizedError('Bearer token is not provided or is invalid')
    const rawToken = bearerToken.split(' ');
    const token = rawToken[0];
    // TODO:
    return jwt.verify(token, 'secret', (error, decoded) => {
      return decoded;
    });
  }
}