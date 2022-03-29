const router = require('express').Router();
const {Post, Comment, User} = require('../models/index');
//authorize users are allowed to use the dashboard
const withAuth = require('../utils/auth');

//get all posts for this user
router.get('/', withAuth, async (req, res) =>{
    //TODO: Needs to be finished route....
    try{
        const userPosts = await Post.findAll({
            where: {
                user_id: req.session.user_id
            },
            attributes: [
                'id',
                'title',
                'post_data',
                'content'
            ],
            include:[
                {
                    model: User,
                    attributes: ['name'],
                }
            ],
            include: [
                {
                    model: Comment,
                }
            ]
        });
    }catch(err){
        
        res.status(500).json(err);

    }
})