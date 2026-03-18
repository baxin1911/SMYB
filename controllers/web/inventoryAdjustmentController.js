export const getInventoryAdjustmentsPage = async (req, res) => {

    const { user } = req;

    return res.render('pages/inventoryAdjustments/inventoryAdjustmentsPage', {
        currentRoute: '/inventory-adjustments',
        user
    });
}