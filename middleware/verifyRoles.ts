import { Request, Response, NextFunction } from "express";

const verifyRoles = (rolesArray: any[]) => {
  return (req: any, res: Response, next: NextFunction) => {
    if (!req?.role)
      return res
        .status(403)
        .json({ message: "No roles provided" });
    const result = rolesArray.includes(req.role);
    if (!result)
      return res
        .status(403)
        .json({ message: "You don't have role access" });
    next();
  };
};

export default verifyRoles;
