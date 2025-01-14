const Comment = require('../models/comment');
const TokenGenerator = require("../models/token_generator");

const CommentsController = {
  Add: (req, res) => {
    const comment = new Comment({
      user_id: req.user_id,
      post_id: req.body.post_id,
      comment: req.body.comment
    });
    comment.save(async (err) => {
      if (err) {
        throw err;
      }
      const token = await TokenGenerator.jsonwebtoken(req.user_id);
      res.status(201).json({ message: 'OK', token: token });
    });
  },

  GetByPostId: async (req, res) => {
    try {
      const comments = await Comment.find({ post_id: req.params.id }).populate('user_id');
      res.json(comments);
    } catch (error) {
      console.log(error);
      res.status(500).send('Server error');
    }
  }
}

module.exports = CommentsController;