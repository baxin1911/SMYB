import pool from "../config/db.js";
import { createUserDtoForToken } from "../dtos/userDTO.js";
import { errorCodeMessages } from "../messages/codeMessages.js";
import { encryptToken } from "../utils/encryptionUtils.js";
import { generateAccessToken, generateRefreshToken, tokenStore, verifyRefreshToken } from "./jwtService.js";
import { getRoleByUserId, getUserIdByEmail, verifyPassword } from "./userService.js";

export const loginUser = async ({ email, password }) => {

    
    const userId = await getUserIdByEmail(email);

    if (!userId) return { error: errorCodeMessages.LOGIN_ERROR };

    const isValid = await verifyPassword(userId, password);

    if (!isValid) return { error: errorCodeMessages.LOGIN_ERROR };

    const role = await getRoleByUserId(userId);
    const tokenDto = createUserDtoForToken(userId, role.name);
    const newRefreshToken = generateRefreshToken(tokenDto);
    const newAccessToken = generateAccessToken(tokenDto);
    const hashedToken = encryptToken(newRefreshToken);
    // Save refreshToken in DB
    tokenStore.hashedRefreshToken = hashedToken;

    return {
        newAccessToken,
        newRefreshToken
    };
}

export const getNewRefreshToken = async ({ refreshToken }) => {

    if (!refreshToken) return { error: errorCodeMessages.INVALID_AUTH };

    const hashedToken = encryptToken(refreshToken);

    const existsToken = hashedToken === tokenStore.hashedRefreshToken;

    if (!existsToken) {

        tokenStore.hashedRefreshToken = null;

        return { error: errorCodeMessages.DETECTED_REUSE };
    }

    const tokenInfo = verifyRefreshToken(refreshToken);

    if (!tokenInfo) return { error: errorCodeMessages.INVALID_AUTH };

    const { id, role } = tokenInfo;
    const tokenDto = createUserDtoForToken(id, role);
    const newAccessToken = generateAccessToken(tokenDto);
    const newRefreshToken = generateRefreshToken(tokenDto);

    // Save refreshToken in DB
    tokenStore.hashedRefreshToken = hashedToken;

    return {
        newAccessToken,
        newRefreshToken
    };
}