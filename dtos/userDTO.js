import { encryptPassword } from "../utils/encryptionUtils.js";

export const createUserDtoForRegister = async (body = {}) => ({

    id: crypto.randomUUID(),
    username: body.username,
    email: body.email,
    verifiedEmail: false,
    roleId: 2,
    password: await encryptPassword(body.password)

});

export const createUserDtoForToken = (id) => ({

    id

});