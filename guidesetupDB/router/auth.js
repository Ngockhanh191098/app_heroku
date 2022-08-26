const authSocial = require("express").Router();
const passport = require("passport");
// const { userGoogle } = require("../controller/auth.controler");

authSocial.get("/login/success", (req, res) => {
	console.log(req);
});

authSocial.get("/login/failed", (req, res) => {
	res.status(401).json({
		error: true,
		message: "Log in failure",
	});
});

authSocial.get("/google", passport.authenticate("google", ["profile", "email"]));

authSocial.get("/google/callback",passport.authenticate("google",{
	failureRedirect: "https://the-shop-men-reactjs.herokuapp.com/login",
	successRedirect: "https://the-shop-men-reactjs.herokuapp.com/",
	session: true
}));

authSocial.get("/logout", (req, res) => {
	req.logout();
	res.redirect("https://the-shop-men-reactjs.herokuapp.com/");
});

module.exports = authSocial;
