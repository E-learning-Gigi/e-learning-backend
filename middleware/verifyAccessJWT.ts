const jwt = require("jsonwebtoken");

export const verifyAccessJWT = (
  req: any,
  res: any,
  next: any
) => {
  // Get headers
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer"))
    return res.status(401).json({ message: "No bearer" });
  // Separete bearer
  const bearer = authHeader.split(" ")[1];
  jwt.verify(
    bearer,
    process.env.ACCESS_TOKEN_SECRET,
    (err: any, decoded: any) => {
      if (err)
        return res
          .status(403)
          .json({ message: "Invalid acc token" });
      req.email = decoded.UserInfo.email;
      // Adding role to request!!
      req.role = decoded.UserInfo.role;
      next();
    }
  );
};
