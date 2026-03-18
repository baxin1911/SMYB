export const getReport = async (req, res) => {

    const { user } = req;

    return res.render('pages/reports/reportPage', {
        currentRoute: '/reports',
        user
    });
}