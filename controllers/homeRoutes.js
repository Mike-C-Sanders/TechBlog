//Home Page Routes
const router = require('express').Router();
const {Post, User, Comment} = require('../models/index');
//authorize users
const withAuth = require('../utils/auth');

//get all of the blog posts
router.get('/', async (req, res) =>{
    try{
        const blogPostData = await Post.findAll({
            include: [
                {
                    model: User,
                    attributes: ['name'],
                }
            ],
        });

        //serialize the data so the template can read it
        const blogPosts = blogPostData.map((blogPost) => blogPost.get({plain: true}));
        
        res.render('homepage', {
            blogPosts,
            logged_in: req.session.logged_in,
        });

    }catch(err){
        res.status(500).json(err);
    }
});

//prevention route from accessing the dashboard if not logged in
router.get('/dashboard', withAuth, async(req, res) =>{
    try{
        //find user session based on the session ID
        const userData = await User.findByPk(req.session.user_id, {
            attributes: {exclude: ['password']},
            include: [{model: Post}],
        });
        //serialize the data before sending to the 
        const user = userData.get({plain: true});

        res.render('dashboard', {
            ...user,
            logged_in: true,
        });
    }catch(err){
        res.status(500).json(err);
    }
})

//login route to the login page should the user click on the log in and be logged in
router.get('/login', (req, res) =>{
    //If the user is logged in then redirect them to their dashboard page
    if(req.session.logged_in){
        res.redirect('/dashboard');
        return;
    }

    res.render('login');
})


module.exports = router;