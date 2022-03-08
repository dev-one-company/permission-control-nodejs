export class PermissionError extends Error {
  public message: string;

  constructor(message: string) {
    super(message);

    this.message = message;
  }
}

export type PermissionsList =
  | "read_user_profile"
  | "update_user_profile"
  | "find_users"
  | "create_user"
  | "delete_user";

export type UsersType = "common" | "admin";

export type PermissionsStructure = {
  [k in UsersType]: PermissionsList[];
};
