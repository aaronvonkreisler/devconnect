const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');
const User = require('../../models/User');
const Profile = require('../../models/Profile');
const Post = require('../../models/Post');

// @route       POST api/posts
// @desc        Create a post
// @access      Private
router.post(
   '/',
   [
      auth,
      [
         check('content', 'Please enter some text to make a post')
            .not()
            .isEmpty(),
      ],
   ],
   async (req, res) => {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
         return res.status(400).json({ errors: errors.array() });
      }

      try {
         const user = await User.findById(req.user.id).select('-password');

         const newPost = new Post({
            text: req.body.text,
            content: req.body.content,
            name: user.name,
            avatar: user.avatar,
            user: req.user.id,
         });

         const post = await newPost.save();

         res.json(post);
      } catch (err) {
         console.error(err.message);
         res.status(500).send('Server Error');
      }
   }
);

// @route       GET api/posts
// @desc        Get all posts
// @access      Private
router.get('/', auth, async (req, res) => {
   try {
      const posts = await Post.find().sort({ date: -1 });
      res.json(posts);
   } catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
   }
});

// @route       GET api/posts/:id
// @desc        Get post by id
// @access      Private
router.get('/:id', auth, async (req, res) => {
   try {
      const post = await Post.findById(req.params.id);
      if (!post) {
         return res.status(404).json({ msg: 'Post not found!' });
      }

      res.json(post);
   } catch (err) {
      console.error(err);

      if (err.kind === 'ObjectId') {
         return res.status(404).json({ msg: 'Post not found!' });
      }
      res.status(500).send('Server Error');
   }
});

// @route       DELETE api/posts/:id
// @desc        Delete a post
// @access      Private
router.delete('/:id', auth, async (req, res) => {
   try {
      const post = await Post.findById(req.params.id);

      if (!post) {
         return res.status(404).json({ msg: 'Post not found' });
      }

      // Check to see if the post belongs to the user
      // attempting to delete it.

      if (post.user.toString() !== req.user.id) {
         return res.status(401).json({ msg: 'User not authorized' });
      }

      await post.remove();

      res.json({ msg: 'Post successfully removed' });
   } catch (err) {
      console.error(err);

      if (err.kind === 'ObjectId') {
         return res.status(404).json({ msg: 'Post not found!' });
      }
      res.status(500).send('Server Error');
   }
});

// @route       PUT api/posts/like/:id
// @desc        Like a post
// @access      Private

router.put('/like/:id', auth, async (req, res) => {
   try {
      const post = await Post.findById(req.params.id);

      // Check if the post has already been liked been the user

      if (
         post.likes.filter((like) => like.user.toString() === req.user.id)
            .length > 0
      ) {
         return res.status(400).json({ msg: 'Post already liked' });
      }

      post.likes.unshift({ user: req.user.id });

      await post.save();

      res.json(post.likes);
   } catch (err) {
      console.error(err);
      res.status(500).send('Server Errot');
   }
});

// @route       PUT api/posts/unlike/:id
// @desc        UNLIKE a post
// @access      Private

router.put('/unlike/:id', auth, async (req, res) => {
   try {
      const post = await Post.findById(req.params.id);

      // Check if the post has already been liked been the user

      if (
         post.likes.filter((like) => like.user.toString() === req.user.id)
            .length === 0
      ) {
         return res.status(400).json({ msg: 'Post has not yet been liked' });
      }

      // Get remove index
      const removeIndex = post.likes.map((like) =>
         like.user.toString().indexOf(req.user.id)
      );

      post.likes.splice(removeIndex, 1);

      await post.save();

      res.json(post.likes);
   } catch (err) {
      console.error(err);
      res.status(500).send('Server Errot');
   }
});

// @route       POST api/posts/comment/:post_id
// @desc        Comment on a users post
// @access      Private
router.post(
   '/comment/:post_id',
   [
      auth,
      [check('text', 'Please enter some text to make a post').not().isEmpty()],
   ],
   async (req, res) => {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
         return res.status(400).json({ errors: errors.array() });
      }

      try {
         const user = await User.findById(req.user.id).select('-password');
         const post = await Post.findById(req.params.post_id);

         const newComment = {
            text: req.body.text,
            name: user.name,
            avatar: user.avatar,
            user: req.user.id,
         };

         post.comments.unshift(newComment);

         await post.save();

         res.json(post.comments);
      } catch (err) {
         console.error(err.message);
         res.status(500).send('Server Error');
      }
   }
);

// @route       DELETE api/posts/comment/:post_id/:comment_id
// @desc        Delete a comment
// @access      Private
router.delete('/comment/:post_id/:comment_id', auth, async (req, res) => {
   try {
      const post = await Post.findById(req.params.post_id);

      // Pull out comment
      const comment = post.comments.find(
         (comment) => comment.id === req.params.comment_id
      );

      // Make sure coment exists

      if (!comment) {
         return res.status(404).json({ msg: 'Comment does not exist' });
      }

      // Check to see if the user deleting the comment is the one who made
      // the comment
      if (comment.user.toString() !== req.user.id) {
         return res.status(401).json({ msg: 'User not authorized' });
      }

      // Get remove index
      const removeIndex = post.comments.map((comment) =>
         comment.user.toString().indexOf(req.user.id)
      );

      post.comments.splice(removeIndex, 1);

      await post.save();

      res.json(post.comments);
   } catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
   }
});

// @route       GET api/posts/user/:user_id
// @desc        Get all posts for a user
// @access      Private
router.get('/user/:user_id', auth, async (req, res) => {
   try {
      const userPosts = await Post.find({ user: req.params.user_id }).sort({
         date: -1,
      });
      if (!userPosts) {
         return res.status(404).json({ msg: 'No posts found for this user' });
      }
      res.json(userPosts);
   } catch (err) {
      console.error(err);
      if (err.kind === 'ObjectId') {
         return res.status(404).json({ msg: 'No posts found for this user!' });
      }
      res.status(500).send('Server Error');
   }
});

module.exports = router;
