import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

interface JwtPayload {
  sub: string;
}

export function isAuthenticate(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authToken = request.headers.authorization;

  if (!authToken) {
    return response.status(401).end();
  }

  const [, token] = authToken.split(" ");

  try {
    const { sub } = verify(
      token,
      process.env.JWT_SECRET || "default_secret"
    ) as JwtPayload;

    request.user_id = sub;

    return next();
  } catch (error) {
    return response.status(401).end();
  }
}
