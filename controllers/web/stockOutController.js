import { getUsernameByUserId } from "../../services/userService.js";

export const getStockOut = async (req, res) => {

    const { user } = req;

    user.username = await getUsernameByUserId(user.id);

    return res.render('pages/stockOut/stockOutPage', {
        currentRoute: '/stockOut',
        user
    });
}