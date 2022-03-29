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
});

//update a blog post
router.put('/:id', withAuth, async(req, res) =>{
    try{
        const updatePost = await Post.update({
            //find which post needs to be updated. 
            where:{
                id: req.params.id,
                user_id: req.session.user_id,
            },
            
        }, 
        //update the posted content
        {
            title: req.body.title,
            content: req.body.content,
        });
        res.status(200).json(updatePost);
    }catch(err){
        res.status(400).json(err);
    }
})

//delete a blog post. Authentication required prior to deleting
router.delete('/:id', withAuth, async (req, res) =>{
    try{
        const blogPostData = await Post.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            }
        });
        if(!blogPostData){
            res.status(404).json({message: `No blog post found with this id!`});
        }
        res.status(200).json(blogPostData);
    }catch(err){
        res.status(400).json(err);
    }
});

module.exports = router;