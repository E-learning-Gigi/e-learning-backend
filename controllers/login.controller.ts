import { Request, Response } from "express";
const bcrypt = require("bcrypt");
import { generateJWT } from "../utils/helpers";
import userService from "../services/user.service";
import { UserFindersKey } from "../utils/userDto";
import {
  ACCESS_TOKEN_DURATION,
  REFRESH_TOKEN_DURATION,
} from "../utils/types";

const handleLogin = async (
  { body: { email, pwd } }: Request,
  res: Response
) => {
  // Find user
  const user = await userService.findUserBy(
    UserFindersKey.EMAIL,
    email
  );
  // Unauthorized
  if (!user) return res.sendStatus(401);
  // Check match
  const match = await bcrypt.compare(pwd, user.pwd);
  if (match) {
    // Find roles
    const role = user.role;
    // Create accessToken with user role and email as payload
    const accessToken = generateJWT({
      data: {
        UserInfo: {
          email: user.email,
          role: role,
        },
      },
      tokenSecret: process.env.ACCESS_TOKEN_SECRET,
      tokenDuration: ACCESS_TOKEN_DURATION,
    });
    const refreshToken = generateJWT({
      data: { email: user.email },
      tokenSecret: process.env.REFRESH_TOKEN_SECRET,
      tokenDuration: REFRESH_TOKEN_DURATION,
    });
    // Update user
    await userService.findAndUpdateRefreshToken(
      email,
      refreshToken
    );

    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
      sameSite: "none",
      secure: true,
    });
    res.json({ accessToken });
  } else {
    res.sendStatus(401);
  }
};

export default handleLogin;
