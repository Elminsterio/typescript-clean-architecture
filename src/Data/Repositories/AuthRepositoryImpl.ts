import jwt from 'jsonwebtoken';
import bcryptjs from 'bcryptjs';
import { AuthRepository } from 'Domain/Repositories/AuthRepository';
import { User } from 'Domain/Entities/User';
import { UnathorizedError } from 'Domain/Entities/Errors';

export class AuthRepositoryImpl implements AuthRepository {
  
  async genSalt() {
    return await bcryptjs.genSalt(13)
  }
  
  async hash(password: string): Promise<string> {
    const salt = await this.genSalt();
    return await bcryptjs.hash(password, salt);
  }

  async compareHashes(passwordIn: string, passwordKept: string): Promise<boolean> {
    return await bcryptjs.compare(passwordIn, passwordKept);
  }

  signToken(user: User): string {
    // TODO: Decidir donde se deben filtrar los datos que sean payload.
    return jwt.sign({...user},'secret', {expiresIn: 300});
  }

  verifyToken(bearerToken: string): void {
    if(!bearerToken) throw new UnathorizedError('Bearer token is not provided or is invalid')
    const rawToken = bearerToken.split(' ');
    const token = rawToken[0];

    return jwt.verify(token, 'secret', (error, decoded) => {
      return decoded;
    });
  }
}