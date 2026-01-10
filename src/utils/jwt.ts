import jwt from "jsonwebtoken";

// const JWT_SECRET = process.env.JWT_SECRET as string;

export interface UserPayload {
  id: number;
  role: string;
}

export function signToken(payload: UserPayload) {
  return jwt.sign(payload, process.env.JWT_SECRET as string, {
    expiresIn: "1d",
  });
}

export function verifyToken(token: string) {
  return jwt.verify(token, process.env.JWT_SECRET as string) as UserPayload;
}
