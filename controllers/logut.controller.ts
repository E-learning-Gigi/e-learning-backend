import { Request, Response } from "express";
import userService from "../services/user.service";

const handleLogout = async (
  { cookies }: Request,
  res: Response
) => {
  // Check cookies
  if (!cookies?.jwt) return res.sendStatus(204);
  const refreshToken = cookies.jwt;

  const user = await userService.findAndDeleteRefreshToken(
    refreshToken
  );

  // Delete cookie if there is no user
  if (!user) {
    res.clearCookie("jwt", {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    return res.sendStatus(204);
  }

  //Clear the cookie
  res.clearCookie("jwt", {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000,
    sameSite: "none",
    secure: true,
  });
  return res
    .status(201)
    .json({ message: "User loged out" });
};

export default handleLogout;
