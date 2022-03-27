const router = require('express').Router();
const {User} = require('../../models/index');

//route to create a new user 
router.post('/', async (req, res) =>{
    try{
        const userData = await User.create(req.body);

        req.session.save(() =>{
            req.session.user_id = userData;
            req.session.logged_in = true;
        });
        res.status(200).json(userData);
    }catch(err){
        res.status(400).json(err);
    }
});

//logging in a user
router.post('/login', async (req, res) =>{
    try{
        const userData = await User.findOne({where: {email: req.body.email}});

        //if the data comes back with no match then let the user know a failed login occured 
        if(!userData){
            res.status(400).json({message: 'wrong email or password! '});
            return;
        }
        //email was correct
        else{
            const validatePassword = await userData.checkPassword(req.body.password);
            //password was incorrect
            if(!validatePassword){
                res.status(400).json({message: 'wrong email or password!'});
            }
            else{
                req.session.save(()=>{
                    req.session.user_id = userData;
                    req.session.logged_in= true;

                    res.json({ user: userData, message: 'You are now logged in!' });
                })
            }
        }

    }catch(err){
        res.status(400).json(err);
    }
});

//logging out
router.post('/logout', (req, res) =>{
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
})

module.exports = router;