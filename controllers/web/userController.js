import { getUsernameByUserId } from "../../services/userService.js";

export const getUser = async (req, res) => {

    const { user } = req;

    user.username = await getUsernameByUserId(user.id);

    return res.render('pages/users/userPage', {
        currentRoute: '/users',
        user
    });
}