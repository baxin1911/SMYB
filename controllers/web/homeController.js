import { getUsernameByUserId } from "../../services/userService.js";

export const getHome = async (req, res) => {

    const { role } = req.user;

    if (role === 'admin') return await getAdminDashboard(req, res);

    return res.render('pages/error/404');
}

const getAdminDashboard = async (req, res) => {

    const { user } = req;

    user.username = await getUsernameByUserId(user.id);

    return res.render('pages/dashboard/adminDashboard', {
        currentRoute: '/dashboard',
        user
    });
}