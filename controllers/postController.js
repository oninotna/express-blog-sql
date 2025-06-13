const connection = require('../data/db.js');



const index = (req, res) => {
    // let filteredPosts = posts;

    // if(req.queryFake.titolo) {
    //     filteredPosts = posts.filter(post => post.titolo.includes(req.query.titolo));
    // };

    // if(req.query.tags) {
    // filteredPosts = posts.filter(post => post.tags.includes(req.query.tags));
    // };

    // if(req.query.contenuto) {
    // filteredPosts = posts.filter(post => post.contenuto.includes(req.query.contenuto));
    // };

    // res.json(filteredPosts);

    // !________________________________________________________________________________________

    const sql = `
      SELECT * 
        FROM posts;
    `;

    connection.query(sql, (err, results) => {
        if (err) return res.status(500).json({err: "Database query failed"});
        res.json(results);
    });
};

const show = (req, res) => {
    // const id = parseInt(req.params.id);

    // const post = posts.find(post => post.id === id);
    
    // res.json(post);

    // !_______________________________________________________________________________________

    const postId = parseInt(req.params.id);

    const sql = `
    SELECT *
    FROM posts
    WHERE posts.id = ?;
    `;

    const tagsSql = `
    SELECT DISTINCT tags.label
    FROM tags
    INNER JOIN post_tag
    ON tags.id = post_tag.tag_id
    WHERE post_tag.post_id = ?;
    `;

    connection.query(sql, [postId], (err,postResults) => {
        if (err) return res.status(500).json({err: "Database query failed"});
        if (!postResults.length) res.json("Post not found");

        const post = postResults[0];

            connection.query(tagsSql, [postId], (err, tagsResults) => {
                if (err) return res.status(500).json({err: "Database query failed"});
                post.tags = tagsResults.map(tagObj => (tagObj.label));
                res.json(post);
            });
    });
};

const store = (req, res) => {
    const {titolo, contenuto, immagine, tags} = req.body;

    let newId = 0;
    for (post of posts) {
        if (post.id > newId) newId = post.id;
    };

    const newPost = {id: newId +1, titolo, contenuto, immagine, tags};
    posts.push(newPost);

    console.log(newPost);
    
    res.json(posts);
};

const update = (req, res) => {
    const id = parseInt(req.params.id);

    const post = posts.find(post => post.id === id);

    if(post === undefined) {
        res.status(404);
        res.json({
            message: 'Nessun post trovato'
        })
        return;
    }

    post.titolo = req.body.titolo;
    post.contenuto = req.body.contenuto;
    post.immagine = req.body.immagine;
    post.tags = req.body.tags;
    
    res.json(posts);
};

const modify = (req, res) => {
    const id = parseInt(req.params.id);

    const post = posts.find(post => post.id === id);

    if(post === undefined) {
        res.status(404);
        res.json({
            message: 'Nessun post trovato'
        })
        return;
    }

    post.titolo = req.body.titolo ? req.body.titolo : post.titolo;
    post.contenuto = req.body.contenuto ? req.body.contenuto : post.contenuto;
    post.immagine = req.body.immagine ? req.body.immagine : post.immagine;
    post.tags = req.body.tags ? req.body.tags : post.tags;
    
    res.json(posts);
};

const destroy  = (req, res) => {
    // const id = parseInt(req.params.id);

    // const post = posts.find(post => post.id === id);

    // if(post === undefined) {
    // res.status(404);
    // res.json({
    //     message: 'Nessun post trovato'
    // })
    // return;
    // } 

    // posts.splice(posts.indexOf(post), 1);
    // res.sendStatus(204);

    // console.log(posts);

    // !________________________________________________________________________________________
    const postId = parseInt(req.params.id);

    const sql = `
      DELETE 
        FROM posts
          WHERE posts.id = ?;
          `;

    connection.query(sql, [postId], (err, results) => {
      if (err)
        return res.status(500).json({ err: "Database query failed" });
        res.status(204);
    });
};

module.exports = {index, show, store, update, modify, destroy};