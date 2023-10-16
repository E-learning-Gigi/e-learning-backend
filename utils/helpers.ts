const jwt = require("jsonwebtoken");
import { GenerateJWT } from "./adminDto";
import { NextFunction, Request, Response } from "express";
import { Validators } from "./validatorDto";

export const customValidator = (validate: Validators, body: string[]) => {
  return function (req: Request, res: Response, next: NextFunction) {
    for (const field of body) {
      if (!req[validate] || !req[validate][field]) {
        return res.status(403).json({ message: `${field} required` });
      }
    }
    next();
  };
};

export const generateJWT = ({ data, tokenSecret, tokenDuration }: GenerateJWT) => {
  const token = jwt.sign(
    {
      ...data,
    },
    tokenSecret,
    { expiresIn: tokenDuration }
  );
  return token;
};
