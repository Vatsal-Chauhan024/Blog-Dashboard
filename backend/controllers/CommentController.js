import {ErrorHandler} from "../utils/Error.js"
import Comment from "../models/commentModel.js"

export const createComment = async (req, res, next) => {
    try {
      const { content, postId, userId } = req.body;
  
      if (userId !== req.user.id) {
        return next(
          ErrorHandler(403, 'You are not allowed to create this comment')
        );
      }
  
      const newComment = new Comment({
        content,
        postId,
        userId,
      });
      await newComment.save();
  
      res.status(200).json(newComment);
    } catch (error) {
      next(error);
    }
  };