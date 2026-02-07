import { getUsernameByUserId } from "../../services/userService.js";

export const getWaste = async (req, res) => {

    const { user } = req;

    user.username = await getUsernameByUserId(user.id);

    return res.render('pages/waste/wastePage', {
        currentRoute: '/waste',
        user
    });
}