const express = require("express");
const router = express.Router();
const commentRouter = require("./user_comments");

router.use("/comments", commentRouter);

module.exports = router;