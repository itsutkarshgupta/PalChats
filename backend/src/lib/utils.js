import jwt from "jsonwebtoken";

export const generateToken = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  res.cookie("jwtToken", token, {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV !== "development", // Use secure cookies in production
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  return token;
};
