
export const renderAbout = async (req, res) => {
    const title = 'A cerca de';
    res.render('about', { title });
};