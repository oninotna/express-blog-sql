const checkId = (req, res, next) => {
    const id = parseInt(req.params.id);

    console.log(`Search for ${id}`);

    const post = posts.find(post => post.id === id);

    if (post === undefined) {
        res.sendStatus(404);
    } else {
        next();
    }
};

module.exports = checkId;