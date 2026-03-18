export const getGoodsReceiptsPage = async (req, res) => {

    const { user } = req;

    return res.render('pages/goodsReceipts/goodsReceiptsPage', {
        currentRoute: '/goods-receipts',
        user
    });
}