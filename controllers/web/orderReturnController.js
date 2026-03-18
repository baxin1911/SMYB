export const getOrderReturnsPage = async (req, res) => {

    const { user } = req;

    return res.render('pages/orderReturns/orderReturnsPage', {
        currentRoute: '/order-returns',
        user
    });
}