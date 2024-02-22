import { Response } from "express";

export interface User {
  id: string;
  email: string;
  pwd: string;
  refreshToken: string | null;
}

interface JWT {
  tokenSecret?: string;
  tokenDuration: string;
}

export interface VerifyJWT extends JWT {
  token: string;
  foundUser: User;
  res: Response;
}

export interface GenerateJWT extends JWT {
  data: any;
}

export enum UserFindersKey {
  REFRESH_TOKEN = "refreshToken",
  EMAIL = "email",
}
