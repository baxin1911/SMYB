import { getUsernameByUserId } from "../../services/userService.js";

export const getStockIn = async (req, res) => {

    const { user } = req;

    user.username = await getUsernameByUserId(user.id);

    return res.render('pages/stockIn/stockInPage', {
        currentRoute: '/stockIn',
        user
    });
}