import { PermissionHandler } from "../src/permissions";
import { PermissionError } from "../src/permissions/types";

describe("Test PermissionHandler.verifyPermissionIsValid", () => {
  it('Should throw PermissionError("Invalid user") exception', () => {
    try {
      PermissionHandler.verifyPermissionIsValid("fail", "update_user_profile");
    } catch (err) {
      expect(err).toBeInstanceOf(PermissionError);
      expect(err.message).toBe("Invalid user");
    }
  });
  it('Should throw PermissionError("This user is not allowed to execute this action") exception', () => {
    try {
      PermissionHandler.verifyPermissionIsValid("common", "create_user");
    } catch (err) {
      expect(err).toBeInstanceOf(PermissionError);
      expect(err.message).toBe(
        "This user is not allowed to execute this action",
      );
    }
  });
  it('Should allow to execute action "create_user" to user "admin"', () => {
    PermissionHandler.verifyPermissionIsValid("admin", "create_user");
  });
  it('Should throw PermissionError("Invalid permission") when pass nonexistent permission', () => {
    try {
      PermissionHandler.verifyPermissionIsValid("admin", "get_plans");
    } catch (err) {
      expect(err).toBeInstanceOf(PermissionError);
      expect(err.message).toBe("Invalid permission");
    }
  });
});
