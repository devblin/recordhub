import { JwtPayload } from './auth';

export interface CustomRequest extends Request {
  user: JwtPayload;
}
