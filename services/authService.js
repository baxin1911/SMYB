import { createUserDtoForToken } from "../dtos/userDTO.js";
import { loginError, authError, detectedReuseError } from "../errors/authError.js";
import { encryptToken } from "../utils/encryptionUtils.js";
import { generateAccessToken, generateRefreshToken, tokenStore, verifyRefreshToken } from "./jwtService.js";
import { getRoleByUserId, getUserIdByEmail, verifyPassword } from "./userService.js";

export const loginUser = async ({ email, password }) => {

    const userId = await getUserIdByEmail(email);

    if (!userId) throw new loginError();

    const isValid = await verifyPassword(userId, password);

    if (!isValid) throw new loginError();

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

    if (!refreshToken) throw new authError();

    const hashedToken = encryptToken(refreshToken);

    const existsToken = hashedToken === tokenStore.hashedRefreshToken;

    if (!existsToken) {

        tokenStore.hashedRefreshToken = null;

        throw new detectedReuseError();
    }

    const tokenInfo = verifyRefreshToken(refreshToken);

    if (!tokenInfo) throw new authError();

    const { id, role } = tokenInfo;
    const tokenDto = createUserDtoForToken(id, role);
    const newAccessToken = generateAccessToken(tokenDto);
    const newRefreshToken = generateRefreshToken(tokenDto);

    // Save refreshToken in DB
    tokenStore.hashedRefreshToken = encryptToken(newRefreshToken);

    return {
        newAccessToken,
        newRefreshToken
    };
}