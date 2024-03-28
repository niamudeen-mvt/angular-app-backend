'use strict'

const express = require('express');
const commentRouter = express.Router();
const CommentsController = require("../controller/user_comments")

commentRouter.route("/").get(CommentsController.getComments);
commentRouter.route("/:comment_id").get(CommentsController.getCommentById);
commentRouter.route("/").post(CommentsController.postComments);
commentRouter.route("/:comment_id").patch(CommentsController.editComment);
commentRouter.route("/:comment_id").delete(CommentsController.deleteComments);



module.exports = commentRouter;