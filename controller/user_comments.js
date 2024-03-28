'use strict';
const db = require("../db.config");

async function getComments(req, res) {
  try {
    const comments_data = await db.UserComments.findAll({
      raw: true,
    });

    const users_data = await db.Users.findAll({
      raw: true,
    });
    

    const temp = comments_data
    .filter(comment => comment.parent_id === null || comment.parent_id == 0) 
    .map(e => ({ ...e, replies: [] })); 


    const result = temp.map(obj => {
        const comments = comments_data.filter(el => el.parent_id === obj.id).map(e => ({ ...e, replies: [] }));
        if (comments.length > 0) {

          const comments_list = comments?.map(comment=>{
            return {
              ...comment,
              tag_user: users_data?.find( e=> e?.id == comment?.tag_id)?.email,
              username: users_data?.find( e=> e?.id == comment?.user_id)?.email
          }
          })

            return {
                ...obj,
                replies: comments_list
            };
        }
        return obj;
    });


    const comments_list = result?.map(comment=>{
      return {
        ...comment,
        tag_user: users_data?.find( e=> e?.id == comment?.tag_id)?.email,
        username: users_data?.find( e=> e?.id == comment?.user_id)?.email
    }
    })

    
    res.status(200).send({
      message: 'success',
      comments: comments_list
    });
  } catch (error) {
    console.log('error: ', error?.message);
    res.status(500).send({
      message: error?.message,
    });
  }
}


async function getCommentById(req, res) {
  try {
    const {comment_id} = req.params
    console.log('comment_id: ', comment_id);
    const comment = await db.UserComments.findOne({
      where:{
        id:comment_id
      }
    })
    
    console.log('comment: ', comment);
    
    res.status(200).send({
      message: 'success',
      comment
    });
  } catch (error) {
    console.log('error: ', error?.message);
    res.status(500).send({
      message: error?.message,
    });
  }
}


async function postComments(req, res) {
  try {

    const { body, user_id, parent_id,type,tag_id} = req.body
    console.log('req.body: ', req.body);
    const commentsData = await db.UserComments.create({
      body,
      user_id,
      parent_id,
      type,
      tag_id
    });

    res.status(200).send({
      message: 'success',
      data:commentsData
    });
  } catch (error) {
    res.status(500).send({
      message: error?.message,
    });
  }
}

async function editComment(req, res) {
  try {
    
    const { comment_id} = req.params
    const {body} = req.body

    const updatedComment = await db.UserComments.update(
      {
        body: body
      },
      {
        where: {
          id: comment_id
        }
      }
    );
    

    res.status(200).send({
      message: 'success',
      data:updatedComment
    });
  } catch (error) {
    console.log('error: ', error?.message);
    res.status(500).send({
      message: error?.message,
    });
  }
}

async function deleteComments(req, res) {
  try {

    const {comment_id} = req.params

    const deltedComment = await db.UserComments.destroy({
      where:{
        id:comment_id
      }
    });

    res.status(200).send({
      message: 'success',
      data:deltedComment
    });
  } catch (error) {
    res.status(500).send({
      message: error?.message,
    });
  }
}




module.exports = {
  getComments,
  postComments,
  editComment,
  deleteComments,
  getCommentById
};
