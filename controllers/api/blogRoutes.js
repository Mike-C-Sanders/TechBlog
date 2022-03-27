//this is for the user's posted content routes
const router = require('express').Router();
const {Post} = require('../../models/index');
//authorization function
const withAuth = require('../../utils/auth');

//create a new post route
router.post('/', withAuth, async (req, res) =>{
    try{
        const newPost = await Post.create({
            ...req.body,
            user_id: req.session.user_id,
        });
        res.status(200).json(newPost);

    }catch(err){
        res.status(400).json(err);

    }
})

module.exports = router;