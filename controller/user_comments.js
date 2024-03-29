const db = require("../db.config");

async function getComments(req, res) {
  try {
    const comments_data = await db.UserComments.findAll({
      raw: true,
    });

    const users_data = await db.Users.findAll({
      raw: true,
    });
    if(!comments_data){
      res.status(404).send({
        message:'Not found`'
      })
    }else{
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

    }

  } catch (error) {
    res.status(500).send({
      message: error?.message,
    });
  }
}


async function getCommentById(req, res) {
  try {
    const {comment_id} = req.params

    const comment = await db.UserComments.findOne({
      where:{
        id:comment_id
      }
    })

    if(!comment){
      res.status(404).send({
        message: 'Not found'
      })
    }else{
      res.status(200).send({
        message: 'success',
        comment
      });
    }
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
    const commentsData = await db.UserComments.create({
      body,
      user_id,
      parent_id,
      type,
      tag_id
    });

    if(!commentsData){
      res.status(404).send({
        message: 'Not found'
      })
    }else{
      res.status(200).send({
        message: 'success',
        data:commentsData
      });
    }

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

    if(comment_id){
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
  
  
      if(!updatedComment){
        res.status(404).send({
          message: 'Not found'
        })
      }else{
        res.status(200).send({
          message: 'success',
          data:updatedComment
        });
      }

    }else{
      res.status(400).send({
        message: 'Comment id is required',
      });
    }


  } catch (error) {
    res.status(500).send({
      message: error?.message,
    });
  }
}

async function deleteComments(req, res) {
  try {

    const {comment_id} = req.params

    if(comment_id){
      const deltedComment = await db.UserComments.destroy({
        where:{
          id:comment_id
        }
      });


      if(!deltedComment){
        res.status(404).send({
          message: 'Not found'
        })
      }else{
        res.status(200).send({
          message: 'success',
          data:deltedComment
        });
      }
      
    }else{
      res.status(400).send({
        message: 'Comment id is required',
      });
    }

  } catch (error) {
    res.status(500).send({
      message: error?.message,
    });
  }
}

async function likeComment(req, res) {
  try {

    const {comment_id} = req.params

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
  getCommentById,
  likeComment
};
