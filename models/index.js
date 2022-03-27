const Comment = require('./Comment');
const User = require('./User');
const Post = require('./Post');

//users have many blog posts
User.hasMany(Post, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

//a post will belong to one user
Post.belongsTo(User, {
    foreignKey: 'user_id'
});

//blog posts have many comments
Post.hasMany(Comment,{
    foreignKey: 'post_id',
    onDelete: 'CASCADE'
});

//Comments will belong to one Blog post.
Comment.belongsTo(Post,{
    foreignKey: 'post_id',
});

module.exports = {Post, Comment, User}