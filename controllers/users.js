const User = require('../models/user');

module.exports.renderRegister = (req, res) => {
    res.render('user/register');
}

module.exports.register = async (req, res, next) => {
    //with try catch - catch error and display it on page if there is one - better more userfriendly than catchAsync handler
    try {
        const { username, email, password } = req.body; // broke up info we get from webpage
        const user = new User({ email, username }); // create new user and save email and username
        const registeredUser = await User.register(user, password); // change password and save it to User database
        //after registration automatically login the user
        req.login(registeredUser, err => {
            if (err) return next(err);
            req.flash('success', 'Welcome to Yelp Camp!'); //message to welcome the new registered user
            res.redirect('/campgrounds'); // page want to go to after registering
        })
    } catch (e) {
        req.flash('error', e.message);
        res.redirect('/register');
    }
}

module.exports.renderLogin = (req, res) => {
    res.render('user/login'); // render the login form - basically copy of the register form

}

module.exports.login = (req, res) => {
    req.flash('success', 'Welcome back!');
    const redirectUrl = req.session.returnTo || '/campgrounds' //returnTo comes from middleware
    delete req.session.returnTo; //clears the returnTo value
    res.redirect(redirectUrl);
}

module.exports.logout = (req, res) => {
    req.logout();
    req.flash('success', 'Goodbye!');
    res.redirect('/campgrounds');
}