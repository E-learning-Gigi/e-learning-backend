import { Request, Response } from "express";
import userService from "../services/user.service";
import { UserFindersKey } from "../utils/userDto";
import { ACCESS_TOKEN_DURATION } from "../utils/types";
const jwt = require("jsonwebtoken");
import { generateJWT } from "../utils/helpers";

const handleRefreshToken = async ({ cookies }: Request, res: Response) => {
  // No cookie
  if (!cookies.jwt) return res.status(401).json({ message: "No cookies" });

  const refreshToken = cookies.jwt;
  // Find user with token
  const foundUser = await userService.findUserBy(
    UserFindersKey.REFRESH_TOKEN,
    refreshToken
  );

  if (!foundUser) return res.status(401);

  // Verify refresh token
  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    (err: any, decoded: any) => {
      if (err || foundUser.email !== decoded.email) return res.sendStatus(401);

      const email = foundUser.email;
      const role = foundUser.role;
      // Create new access token
      const accessToken = generateJWT({
        data: {
          UserInfo: {
            email: decoded.email,
            role: role,
          },
        },
        tokenSecret: process.env.ACCESS_TOKEN_SECRET,
        tokenDuration: ACCESS_TOKEN_DURATION,
      });
      // Return access token
      res.json({ accessToken, email });
    }
  );
};

export default handleRefreshToken;
