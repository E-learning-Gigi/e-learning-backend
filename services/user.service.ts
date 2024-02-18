import prisma from "../prisma";
import { UserFindersKey } from "../utils/adminDto";

const registerUser = async (
  email: string,
  hashedPwd: string
) => {
  return await prisma.user.create({
    data: {
      email: email,
      pwd: hashedPwd,
    },
  });
};

const findUserBy = async (
  finder: UserFindersKey,
  value: string
) => {
  const user = await prisma.user.findFirst({
    where: {
      [finder]: value,
    },
  });
  return user;
};

const findAndUpdateRefreshToken = async (
  email: string,
  refreshToken: string
) => {
  await prisma.user.update({
    where: {
      email: email,
    },
    data: {
      refreshToken: refreshToken,
    },
  });
};

const findAndDeleteRefreshToken = async (
  refreshToken: string
) => {
  const user = await prisma.user.update({
    where: {
      refreshToken: refreshToken,
    },
    data: {
      refreshToken: "",
    },
  });
  return user;
};

export default {
  registerUser,
  findUserBy,
  findAndUpdateRefreshToken,
  findAndDeleteRefreshToken,
};
