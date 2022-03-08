import {
  PermissionError,
  PermissionsList,
  PermissionsStructure,
  UsersType,
} from "./types";

export const permissions: PermissionsStructure = {
  admin: ["create_user", "delete_user", "find_users"],
  common: ["read_user_profile", "update_user_profile"],
};

function findPermissionOnAll(permission: PermissionsList) {
  const usersList: UsersType[] = Object.keys(permissions) as UsersType[];

  for (const key of usersList) {
    if (permissions[key].find(perm => perm === permission)) {
      return true;
    }
  }
  return false;
}
export class PermissionHandler {
  public static verifyPermissionIsValid(
    user: UsersType,
    permissionToCheck: PermissionsList,
  ) {
    if (!Object.keys(permissions).find(userItem => userItem === user))
      throw new PermissionError("Invalid user");
    if (!findPermissionOnAll(permissionToCheck))
      throw new PermissionError("Invalid permission");

    const userPermissionsAllowed = permissions[user];

    const findPermissionValid = userPermissionsAllowed.find(
      permission => permission === permissionToCheck,
    );

    if (!findPermissionValid) {
      throw new PermissionError(
        "This user is not allowed to execute this action",
      );
    }
  }
}
