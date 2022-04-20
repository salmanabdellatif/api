const db = require('../utils/db.js');

module.exports = app => {
  app.post('/', (req, res) => {
    const { title, content } = req.body;
    const { user } = req;
    const data = db.getData();
    data.posts.push({ title, content, userId: user.id });
    db.savaData(data);
    res.json(data.post);
  });

  app.put('/:id', (req, res) => {
    const { title, content } = req.body;
    const data = db.getData();
    const { id } = req.params;
    const post = data.posts[id];
    if (!post) return res.status(404), end();
    if (title) post.title = title;
    if (content) post.content = content;
    db.savaData(data);
    res.status(201).end();
  });

  app.delete('/:id', (req, res) => {
    const { id } = req.params;
    const data = db.getData();
    const post = data.posts[id];
    if (!post) return res.status(404).end();
    data.posts.splice(id, 1);
    db.savaData(data);
    res.status(201).end();
  });

  app.get('/', (req, res) => {
    const { posts } = db.getData();
    res.json(posts);
  });

  app.get('/:id', (req, res) => {
    const { id } = req.params;
    const { posts } = db.getData();
    const post = posts[id];
    if (!post) return res.status(404).end();
    res.json(post);
  });

  return app;
};
