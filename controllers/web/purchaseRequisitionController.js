export const getPurchaseRequisitionsPage = async (req, res) => {

    const { user } = req;

    return res.render('pages/purchaseRequisitions/purchaseRequisitionsPage', {
        currentRoute: '/purchase-requisitions',
        user
    });
}