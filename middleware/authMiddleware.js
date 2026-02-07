import { verifyAccessToken } from "../services/jwtService.js";
import { errorCodeMessages } from "../messages/codeMessages.js";
import { clearAuthCookies } from "../utils/cookiesUtils.js";

const getAuthTokenInfo = ( req, res) => {

    const { accessToken } = req.cookies;

    if (!accessToken) {
        
        clearAuthCookies(res);
        return null;
    }

    const tokenInfo = verifyAccessToken(accessToken);

    if (!tokenInfo) {

        clearAuthCookies(res);
        return null;
    }

    return tokenInfo;
}

export const verifyCookiesAuthTokenRequired = (req, res, next) => {

    const tokenInfo = getAuthTokenInfo(req, res);

    if (!tokenInfo) {
        
        res.cookie('returnTo', req.originalUrl, { httpOnly: true });

        return res.redirect('/auth/refresh');
    }

    req.user = tokenInfo;
    
    next();
}

export const verifyApiTokenRequired = (req, res, next) => {

    const tokenInfo = getAuthTokenInfo(req, res);

    if (!tokenInfo) return res.status(401).json({ code: errorCodeMessages.INVALID_AUTH });

    req.user = tokenInfo;
    next();
}