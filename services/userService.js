import { createUserDtoForRegister } from "../dtos/userDTO.js";
import { comparePassword, encryptPassword } from "../utils/encryptionUtils.js";

let users = [
    {
        id: 'd71b8086-404f-4f17-a2bd-bfdace98bf3c',
        email: 'dersey@example.com',
        verifiedEmail: true,
        password: await encryptPassword('Qwerty%1'),
        username: 'frontierZone',
        roleId: 1
    }
];

let roles = [
    { id: 1, name: 'admin' },
    { id: 2, name: 'user' },
    { id: 1, name: 'author' },
]

export const saveUser = async (body) => {

    const userDto = await createUserDtoForRegister(body);
    users.push(userDto);
    
    return userDto.id;
}

export const getUserByEmail = async (email) => {

    return users.find(user => user.email === email);
}

export const getUserIdByEmail = async (email) => {

    const user = users.find(user => user.email === email);

    return user ? user.id : null;
}

export const getRoleByUserId = async (userId) => {

    const roleId = users.find(user => user.id === userId).roleId;

    return roles.find(role => role.id === roleId);
}

export const getUsernameByUserId = async (userId) => {

    return users.find(user => user.id === userId).username;
}

export const editPasswordByUserId = async (userId, password) => {

    const hashedPassword = await encryptPassword(password);

    users.find(user => user.id === userId).password = hashedPassword;
}

export const editUsernameByUserId = async (userId, username) => {

    users.find(user => user.id === userId).username = username;
}

export const verifyPassword = async (userId, password) => {

    const user = users.find(user => user.id === userId);

    return await comparePassword(password, user.password);
}