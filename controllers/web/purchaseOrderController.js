export const getPurchaseOrdersPage = async (req, res) => {

    const { user } = req;

    return res.render('pages/purchaseOrders/purchaseOrdersPage', {
        currentRoute: '/purchase-orders',
        user
    });
}