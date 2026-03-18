export const getSuppliers = async (req, res) => {

    const { user } = req;

    return res.render('pages/suppliers/suppliersPage', {
        currentRoute: '/suppliers',
        user
    });
}