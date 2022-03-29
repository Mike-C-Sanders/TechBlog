//These routes are for creating/updating and deleting a comment
const router = require('express').Router();
const {Comment} = require('../../models/index');
//authorization function checking if the user is authorized to carry out the actions
const withAuth = require('../../utils/auth');

//create a new comment
router.post('/', withAuth, async(req, res) => {
    try{
        const newComment = await Comment.create({
            ...req.body,
            user_id: req.session.user_id,
        });
        res.status(200).json(newComment);
    }catch(err){
        res.status(500).json(err);
    }
});

router.post('/:id', withAuth, async(req, res) =>{
    try{
        const updateComment = await Comment.update({
            //validate that the user updating is the author of the comment
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            }
        },
        {
            comment_text: req.body.comment_text,
        });
        //check if the comment exists
        if(!updateComment){
            res.status(404).json({message: `No comment found with that id.`});
        }

        res.status(200).json(updateComment);

    }catch(err){
        res.status(500).json(err);
    }
})