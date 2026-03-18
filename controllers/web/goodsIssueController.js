export const getGoodsIssuesPage = async (req, res) => {

    const { user } = req;

    return res.render('pages/goodsIssues/goodsIssuesPage', {
        currentRoute: '/goods-issues',
        user
    });
}