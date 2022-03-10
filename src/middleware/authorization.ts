import { NextFunction, Request, Response } from "express";
import jwt, { JsonWebTokenError } from "jsonwebtoken";

import { configs } from "../configs";
import { PermissionHandler } from "../permissions";

import {
  PermissionError,
  PermissionsList,
  UsersType,
} from "../permissions/types";

export const authorization =
  (permissions: PermissionsList[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization;
      if (!token) throw new PermissionError("Missing user token");

      const jwtToken = token.split(" ")[1];
      const result: { user_type: UsersType } = jwt.verify(
        jwtToken,
        configs.JWT_SECRET,
      ) as any;

      PermissionHandler.verifyPermissionIsValid(result.user_type, permissions);

      next();
    } catch (err: unknown) {
      if (err instanceof PermissionError || err instanceof JsonWebTokenError) {
        return res.status(401).json({
          message: err.message,
        });
      } else {
        return res.status(403).json({
          message: "Unauthorized",
        });
      }
    }
  };
