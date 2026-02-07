import { validateEmail, validatePassword, validateRepeatedPassword, validateUsername } from "./authValidations.js";
import { validateAvatarPath, validateCoverPath, validateLastName, validateName } from "./profileValidations.js";
import { validateQuery } from "./searchValidations.js";

export const validators = {
    name: validateName,
    lastName: validateLastName,
    email: validateEmail,
    password: validatePassword,
    repeatedPassword: (value, data) => validateRepeatedPassword(value, data.password),
    username: validateUsername,
    coverPath: validateCoverPath,
    avatarPath: validateAvatarPath,
    q: validateQuery,
}