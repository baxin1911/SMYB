export const getCategoriesPage = async (req, res) => {

    const { user } = req;

    return res.render('pages/categories/categoriesPage', {
        currentRoute: '/categorias',
        user
    });
}