const { getSessionToken } = require('../utils/jwt');
module.exports = (app, db) => {
  app.post('/', async (req, res) => {
    const { title, content } = req.body;
    const {
      rows: [post],
    } = await db.query(
      `insert into posts (title, content) values('${title}','${content}') RETURNING id`
    );
    res.json({
      done: { id: post.id, post_title: title, post_content: content },
    });
  });

  app.put('/:id', async (req, res) => {
    const { title, content } = req.body;
    const {
      rows: [post],
    } = await db.query(`SELECT * FROM posts where id = ${req.params.id};`);
    if (!post) return res.status(404).end();
    if (title && content) {
      await db.query(
        `UPDATE posts SET title = '${title}', content = '${content}' where id = ${req.params.id};`
      );
    }
    res.status(201).json({ msg: 'successfully edited' });
  });

  app.delete('/:id', async (req, res) => {
    const {
      rows: [post],
    } = await db.query(`SELECT * FROM posts where id = ${req.params.id};`);
    if (!post) return res.status(404).end();
    await db.query(`DELETE FROM posts WHERE id = ${req.params.id};`);
    res.status(201).json({ delete: 'done' });
  });

  app.get('/', async (req, res) => {
    const postsList = await db.query(`SELECT * FROM posts;`);
    res.json(postsList.rows);
  });

  app.get('/:id', async (req, res) => {
    console.log(req.params.id);
    const {
      rows: [post],
    } = await db.query(`SELECT * FROM posts WHERE id = ${req.params.id}`);
    if (!post) return res.status(404).end();
    res.json(post);
  });

  return app;
};
