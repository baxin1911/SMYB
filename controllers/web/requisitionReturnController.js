export const getrequisitionsReturnsPage = async (req, res) => {

    const { user } = req;

    return res.render('pages/requisitionReturns/requisitionReturnsPage', {
        currentRoute: '/requisitions-returns',
        user
    });
}