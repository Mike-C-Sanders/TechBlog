//Comment class is the table meant to hold the comments for each blog post
const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');

class Comment extends Model{};

Comment.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        comment_text:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id',
            }
        },
        post_id:{
            type: DataTypes.INTEGER,
            references: {
                model: 'post',
                key: 'id',
            }
        }
    },
    {
        sequelize,
        timestamps: false,
        underscored: true,
        modelName: 'comment',
    }
);

module.exports = Comment;