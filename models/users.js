'use strict'


module.exports = ( sequelize, DataTypes) => {
  const Users = sequelize.define
  ('Users',{
    id:{
      type: DataTypes.INTEGER,
      autoIncrement:true,
      primaryKey:true
    },
    email:DataTypes.STRING,
  },{
    tableName: 'USER',
    timestamps: false
  })
  return Users
}
