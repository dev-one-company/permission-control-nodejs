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
    permissionsToCheck: PermissionsList[],
  ) {
    if (!Object.keys(permissions).find(userItem => userItem === user))
      throw new PermissionError("Invalid user");

    for (const permissionToCheck of permissionsToCheck) {
      const result = findPermissionOnAll(permissionToCheck);
      if (!result) {
        throw new PermissionError(
          `Permission "${permissionToCheck}" is invalid`,
        );
      }
    }

    const userPermissionsAllowed = permissions[user];

    const findPermissionValid = permissionsToCheck.find(perm =>
      userPermissionsAllowed.some(userPerm => userPerm === perm),
    );

    if (!findPermissionValid) {
      throw new PermissionError(
        "This user is not allowed to execute this action",
      );
    }
  }
}
