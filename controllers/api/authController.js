import { errorCodeMessages, successCodeMessages } from "../../messages/codeMessages.js";
import { clearAuthCookies, setAuthCookies } from "../../utils/cookiesUtils.js";
import { saveUser } from "../../services/userService.js";
import { editPasswordByUserId } from "../../services/userService.js";
import { getNewRefreshToken, loginUser } from "../../services/authService.js";

export const login = async (req, res) => {

    try {

        const { email, password } = req.body || {};
        const result = await loginUser({ email, password });

        if (result.error) return res.status(400).json({ code: result.error });

        setAuthCookies(res, result.newAccessToken, result.newRefreshToken);

        return res.status(200).json({ code: successCodeMessages.SUCCESS_LOGIN });

    } catch (error) {
console.log(error)
        return res.status(500).json({ code: errorCodeMessages.SERVER_ERROR });
    }
}

export const registerAccount = async (req, res) => {

    const userId = await saveUser(req.body);

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
    const  result = await getNewRefreshToken({ refreshToken });

    if (result.error) {
        
        clearAuthCookies(res);

        return res.status(401).json({ code: result.error });
    }

    setAuthCookies(res, result.newAccessToken, result.newRefreshToken);

    return res.sendStatus(200);
}