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

export class PermissionHandler {
  public static verifyPermissionIsValid(
    user: UsersType,
    permissionToCheck: PermissionsList
  ) {
    if (!Object.keys(permissions).find((userItem) => userItem === user))
      throw new PermissionError("Invalid user");

    const userPermissionsAllowed = permissions[user];

    const findPermissionValid = userPermissionsAllowed.find(
      (permission) => permission === permissionToCheck
    );

    if (!findPermissionValid) {
      throw new PermissionError(
        "This user is not allowed to execute this action"
      );
    }
  }
}
