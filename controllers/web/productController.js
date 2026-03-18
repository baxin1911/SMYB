export const getProductsPage = async (req, res) => {

    const { user } = req;

    return res.render('pages/products/productsPage', {
        currentRoute: '/productos',
        user
    });
}