import { tokenStore, generateAccessToken, generateRefreshToken } from "../../services/jwtService.js";
import { errorCodeMessages, successCodeMessages } from "../../messages/codeMessages.js";
import { encryptToken } from "../../utils/encryptionUtils.js";
import { clearAuthCookies, setAuthCookies } from "../../utils/cookiesUtils.js";
import { getUserByEmail } from "../../services/userService.js";
import { createUserDtoForRegister, createUserDtoForToken } from "../../dtos/userDTO.js";
import { saveUser } from "../../services/userService.js";
import { editPasswordByUserId } from "../../services/userService.js";
import { verifyPassword } from "../../services/userService.js";
import { getRoleByUserId } from "../../services/userService.js";
import { getNewRefreshToken } from "../../services/authService.js";

export const login = async (req, res) => {

    const { email, password } = req.body || {};

    const user = await getUserByEmail(email);

    if (!user) return res.status(401).json({ code: errorCodeMessages.LOGIN_ERROR });

    const isValid = await verifyPassword(user.id, password);

    if (!isValid) return res.status(401).json({ code: errorCodeMessages.LOGIN_ERROR });
    
    const role = await getRoleByUserId(user.id);
    const tokenDto = createUserDtoForToken(user.id, role.name);
    // if (result.error) return res.status(500).json({ message: result.error });

    // 429, 500

    const newRefreshToken = generateRefreshToken(tokenDto);
    const newAccessToken = generateAccessToken(tokenDto);
    const hashedToken = encryptToken(newRefreshToken);

    // Save refreshToken in DB
    tokenStore.hashedRefreshToken = hashedToken;
    setAuthCookies(res, newAccessToken, newRefreshToken);

    return res.status(200).json({ code: successCodeMessages.SUCCESS_LOGIN });
}

export const registerAccount = async (req, res) => {

    const userDto = await createUserDtoForRegister(body);
    const userId = await saveUser(userDto);

    return res.status(201).json({ code: successCodeMessages.CREATED_ACCOUNT });
}

export const resetPassword = async (req, res) => {

    const { password } = req.body || {};
    const { id } = req || {};

    await editPasswordByUserId(id, password);

    // if (result.error) return res.status(500).json({ message: result.error });

    //401, 403, 404, 429, 500

    return res.status(200).json({ code: successCodeMessages.UPDATED_RESET_PASSWORD });
}

export const refreshAuthToken = async (req, res) => {

    const { refreshToken } = req.cookies;
    const  result = await getNewRefreshToken(refreshToken);

    if (result.error) {
        
        clearAuthCookies(res);

        return res.status(401).json({ code: result.error });
    }

    setAuthCookies(res, result.newAccessToken, result.newRefreshToken);

    return res.sendStatus(200);
}