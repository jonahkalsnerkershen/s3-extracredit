import Post from '../models/post_model';

export const createPost = (req, res) => {
  const post = new Post();
  post.title = req.body.title;
  post.tags = req.body.tags;
  post.content = req.body.content;
  post.coverUrl = req.body.coverUrl;
  console.log(`author is: ${req.user.username}`);
  post.author = req.user.username;

  post.save()
    .then((result) => {
      res.json({ message: 'Post created!' });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
//   res.send('post should be created and returned');
};
export const getPosts = (req, res) => {
  Post.find({}).sort({ createdAt: -1 }).then((result) => {
    res.send(result);
  })
    .catch((error) => {
      res.status(500).json({ error });
    });
//   res.send('posts should be returned');
};
export const getPost = (req, res) => {
  return Post.findById(req.params.id).then((result) => {
    res.send(result);
    // res.send('single post looked up');
  })
    .catch((error) => {
      res.status(500).json({ error });
    });
};
export const deletePost = (req, res) => {
  return Post.remove({ _id: req.params.id }).then((result) => {
    res.send(result);
  })
    .catch((error) => {
      res.status(500).json({ error });
    });
//   res.send('delete a post here');
};
export const updatePost = (req, res) => {
  const fields = {
    title: req.body.title,
    tags: req.body.tags,
    content: req.body.content,
    coverUrl: req.body.coverUrl,
    author: req.user,
  };
  return Post.findOneAndUpdate({ _id: req.params.id }, fields, { new: true }).then((result) => {
    res.send(result);
  })
    .catch((error) => {
      res.status(500).json({ error });
    });
};
