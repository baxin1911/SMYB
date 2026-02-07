import { getUsernameByUserId } from "../../services/userService.js";

export const getInventory = async (req, res) => {

    const { user } = req;

    user.username = await getUsernameByUserId(user.id);

    return res.render('pages/inventory/inventoryPage', {
        currentRoute: '/inventory',
        user
    });
}