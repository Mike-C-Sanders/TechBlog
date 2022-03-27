//authorize the user function. if they aren't authorized then send back to login page
const withAuth = (req, res, next) =>{
    if(!req.session.logged_in){
        res.redDirect('/login');
    }
    else{
        next();
    }
}

module.exports = withAuth;