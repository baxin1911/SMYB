import { getUsernameByUserId } from "../../services/userService.js";

export const getReport = async (req, res) => {

    const { user } = req;

    user.username = await getUsernameByUserId(user.id);

    return res.render('pages/reports/reportPage', {
        currentRoute: '/reports',
        user
    });
}