const bodyParser = require('body-parser');
const express = require('express');

const STATUS_USER_ERROR = 422;

// This array of posts persists in memory across requests. Feel free
// to change this to a let binding if you need to reassign it.
let posts = [];

const server = express();
// to enable parsing of json bodies for post requests
server.use(bodyParser.json());
let id = 0;

server.get('/posts', (req, res) => {
  const postsWithTerm = [];
  if (req.query.term) {
    for (let i = 0; i < posts.length; i++) {
      if (
        posts[i].title.includes(req.query.term) ||
        posts[i].contents.includes(req.query.term)
      ) {
        postsWithTerm.push(posts[i]);
      }
    }
    res.json(postsWithTerm);
    return;
  }
  res.json(posts);
});

server.post('/posts', (req, res) => {
  if (!req.body.title) {
    res.status(STATUS_USER_ERROR);
    res.json({ error: "You fool, there's more to life than missing a title!" });
    return;
  }
  if (!req.body.contents) {
    res.status(STATUS_USER_ERROR);
    res.json({
      error: "You fool, there's more to life than missing some contents!",
    });
    return;
  }
  if (req.body.title && req.body.contents) {
    const post = {
      id,
      title: req.body.title,
      contents: req.body.contents,
    };
    id++;
    posts.push(post);
    res.json(post);
    return;
  }
});

server.put('/posts', (req, res) => {
  const { id, title, contents } = req.body;
  if (!title || !id || !contents) {
    res.status(STATUS_USER_ERROR);
    res.json({
      error: "You fool, there's more to life than missing some contents!",
    });
    return;
  }
  if()
  const post = {};
  posts.forEach((p) => {
    if (p.id === id) {
      p.title = title;
      p.contents = contents;
      post[title] = title;
      post[contents] = contents;
      post[id] = id;
    }
  });
  res.json(post);
  /* if (!req.body.title) {
    res.status(STATUS_USER_ERROR);
    res.json({ error: "You fool, there's more to life than missing a title!" });
    return;
  }
  if (!req.body.contents) {
    res.status(STATUS_USER_ERROR);
    res.json({
      error: "You fool, there's more to life than missing some contents!",
    });
    return;
  }
  if (!req.body.id && req.body.id !== 0) {
    res.status(STATUS_USER_ERROR);
    console.log('posting!', req.body.title);
    res.json({
      error: "You fool, there's more to life than missing some id there!",
    });
    return;
  }
  if (req.body.id >= posts.length) {
    res.status(STATUS_USER_ERROR);
    res.json({
      error: "You fool, there's more to life than going off the deep end!",
    });
    return;
  }
  if (req.body.title && req.body.contents && req.body.id) {
    const postToChange = posts.filter((post, i) => {
      return post.id === req.body.id;
    });

    postToChange[0].title = req.body.title;
    postToChange[0].contents = req.body.contents;
    posts.splice(postToChange[0].id, 1, postToChange[0]);
    res.json(postToChange[0]);
    return;
  } */
});

server.delete('/posts', (req, res) => {
  const idToDelete = Number(req.body.id);
  if (idToDelete > posts.length - 1 || idToDelete < 0) {
    res.status(STATUS_USER_ERROR);
    res.json({
      error: "You fool, there's more to life than giving an invalid id!",
    });
    return;
  }

  if (!idToDelete && idToDelete !== 0) {
    res.status(STATUS_USER_ERROR);
    res.json({
      error:
        "You fool, there's more to life than missing some id there delete!",
    });
    return;
  }
  if (idToDelete || (idToDelete === 0 && idToDelete < posts.length)) {
    const newPosts = posts.filter((post) => {
      if (post.id === Number(req.body.id)) {
        return false;
      }
      return true;
    });
    posts = [];
    for (let j = 0; j < newPosts.length; j++) {
      newPosts[j].id = j;
      posts.push(newPosts[j]);
    }
    console.log('got to deleting...');
    // posts.splice(Number(req.body.id), 1);
    console.log('posts', posts);
    res.json({ success: true });
    return;
  }
});
// TODO: your code to handle requests

module.exports = { posts, server };
