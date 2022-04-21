const ObjectId = require('mongodb').ObjectId;

module.exports = (app, db) => {
  const posts = db.collection('posts');
  app.post('/', async (req, res) => {
    const { title, content } = req.body;
    const post = await posts.insertOne({ title: title, content: content });
    res.json({ done: { insertedId: post.insertedId } });
  });

  app.put('/:id', async (req, res) => {
    const { title, content } = req.body;
    const posts = db.collection('posts');
    const post = await posts.findOne({
      _id: ObjectId(req.params),
    });
    if (!post) return res.status(404).end();
    if (title && content)
      await posts.updateOne(
        {
          _id: ObjectId(req.params.id),
        },
        { $set: { title: title, content: content } }
      );
    res.status(201).json({ msg: 'successfully edited' });
  });

  app.delete('/:id', async (req, res) => {
    const post = await posts.findOne({
      _id: ObjectId(req.params),
    });
    if (!post) return res.status(404).end();
    await posts.deleteOne({ _id: ObjectId(req.params.id) });
    res.status(201).json({ delete: 'done' });
  });

  app.get('/', async (req, res) => {
    const postsList = await posts
      .find()
      .toArray()
      .then(e => {
        return e;
      });
    res.json({ postsList });
  });

  app.get('/:id', async (req, res) => {
    console.log(req.params.id);
    const post = await posts.findOne({
      _id: ObjectId(req.params.id),
    });
    if (!post) return res.status(404).end();
    res.json(post);
  });

  return app;
};
