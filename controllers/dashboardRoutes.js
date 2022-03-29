const router = require('express').Router();
const { json } = require('express/lib/response');
const {Post, Comment, User} = require('../models/index');
//authorize users are allowed to use the dashboard
const withAuth = require('../utils/auth');

//get all posts for this user
router.get('/', withAuth, async (req, res) =>{
    try{
        //Store the db query into a variable which will be serialized
        const userPosts = await Post.findAll({
            where: {
                user_id: req.session.user_id
            },
            
            include:[User],
            
        });
        //serialize the query
        const posts = userPosts.map((post) => post.get({plain: true}));

        //render the view in handlebars
        res.render()
    }catch(err){
        
        res.status(500).json(err);

    }
})