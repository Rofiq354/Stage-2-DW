import jwt from "jsonwebtoken";

export interface UserPayload {
  id: number;
  role: string;
}

export function signToken(payload: UserPayload): string {
  return jwt.sign(payload, process.env.JWT_SECRET!, {
    expiresIn: "1d",
  });
}

export function verifyToken(token: string): UserPayload {
  return jwt.verify(token, process.env.JWT_SECRET!) as UserPayload;
}
