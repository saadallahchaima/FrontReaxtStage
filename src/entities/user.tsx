import { Role } from "./Roles";
import { Token } from "./Token";

// For User
export interface User {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    role: Role;
    tokens: Token[];
  }