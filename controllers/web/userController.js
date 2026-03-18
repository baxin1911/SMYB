export const getUser = async (req, res) => {

    const { user } = req;

    return res.render('pages/users/userPage', {
        currentRoute: '/users',
        user
    });
}