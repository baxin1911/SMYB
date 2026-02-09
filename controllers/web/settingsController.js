import { getUsernameByUserId } from "../../services/userService.js";

export const getSettings = async (req, res) => {

    const { user } = req;

    user.username = await getUsernameByUserId(user.id);

    return res.render('pages/settings/settingsPage', {
        currentRoute: '/settings',
        user
    });
}