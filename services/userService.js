import prisma from "../lib/prisma.js";
import { comparePassword, encryptPassword } from "../utils/encryptionUtils.js";

export const saveUser = async (userDto) => {

    return prisma.user.create({
        data: userDto
    });
}

export const getUserIdByEmail = async (email) => {

    const user = await prisma.user.findUnique({
        where: {
            email: email
        }
    });

    return user ? user.id : null;
}

export const getRoleByUserId = async (userId) => {

    const user = await prisma.user.findFirst({
        where: {
            id: userId
        }
    });

    return user ? user.roleId : null;
}

export const getUsernameByUserId = async (userId) => {

    const user = await prisma.user.findUnique({
        where: {
            id: userId
        }
    });

    return user ? user.username : null;
}

export const editPasswordByUserId = async (userId, password) => {

    const hashedPassword = await encryptPassword(password);

    await prisma.user.update({
        where: {
            id: userId
        },
        data: {
            password: hashedPassword
        }
    });
}

export const verifyPassword = async (userId, password) => {

    const user = await prisma.user.findUnique({
        where: {
            id: userId
        }
    });

    return await comparePassword(password, user.password);
}