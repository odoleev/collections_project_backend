import { Tokens } from './token.types';

export interface LoginReturn {
  tokens: Tokens;
  username: string;
  role: string;
  banStatus: boolean;
  id: string;
}
