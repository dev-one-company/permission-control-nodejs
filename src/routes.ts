import { Router } from "express";
import jwt from "jsonwebtoken";

import { configs } from "./configs";
import { authorization } from "./middleware/authorization";
import { permissions } from "./permissions";

const router = Router();

router.post("/login/common", (_, res) => {
  return res.status(200).json({
    token: jwt.sign(
      JSON.stringify({
        user_type: "common",
      }),
      configs.JWT_SECRET,
    ),
  });
});

router.post("/login/admin", (_, res) => {
  return res.status(200).json({
    token: jwt.sign(
      JSON.stringify({
        user_type: "admin",
      }),
      configs.JWT_SECRET,
    ),
  });
});

router.get("/only_admins", authorization(permissions.admin), (_, res) => {
  return res.json({
    message: `only admins can: ${permissions.admin.join(", ")}`,
  });
});

router.get("/only_commons", authorization(permissions.common), (_, res) => {
  return res.json({
    message: `only commons can: ${permissions.common.join(", ")}`,
  });
});

router.get(
  "/only_specific",
  authorization(["read_user_profile", "create_user"]),
  (_, res) => {
    return res.json({
      message: `only specific can: read_user_profile, create_user`,
    });
  },
);

export default router;
