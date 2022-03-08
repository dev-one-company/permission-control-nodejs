import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

import { configs } from "../configs";

import { PermissionError } from "../permissions/types";

export const authorization = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = req.headers.authorization;
  if (!token) throw new PermissionError("Missing user token");

  const result = jwt.verify(token, configs.JWT_SECRET);

  console.log(result);
  next();
};
