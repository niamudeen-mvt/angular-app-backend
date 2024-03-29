'use strict'


module.exports = ( sequelize, DataTypes) => {
  const UserComments = sequelize.define
  ('UserComments',{
    id:{
      type: DataTypes.INTEGER,
      autoIncrement:true,
      primaryKey:true
    },
    body:DataTypes.STRING,
    user_id:DataTypes.INTEGER,
    parent_id:DataTypes.INTEGER,
    tag_id:DataTypes.INTEGER,
    type:DataTypes.STRING,
    createdAt:DataTypes.DATE
  },{
    tableName: 'USER_COMMENTS',
    timestamps: false
  })
  return UserComments
}
