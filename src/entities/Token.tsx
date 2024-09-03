import { User } from "./user";

export interface Token {
    id: number;
    token: string;
    tokenType: TokenType;
    revoked: boolean;
    expired: boolean;
    user: User;
  }
  
  // For TokenType Enum
  export enum TokenType {
    BEARER = 'BEARER'
  }