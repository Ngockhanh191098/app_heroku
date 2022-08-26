const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");
const db = require('./models/db.model')
const UserModel = db.User;

passport.use(
	new GoogleStrategy(
		{
			clientID: "822215341021-vp9r93mjs77l4uo4j18r933ukfgak4u0.apps.googleusercontent.com",
			clientSecret: "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",
			callbackURL: "https://the-men-shop-fullstack.herokuapp.com/auth/google/callback",
			scope: ["profile", "email"],
		},
		async function ( accessToken, refreshToken, profile, callback) {
			// console.log(profile);
			callback(null, profile)
			// try {
			// 	const user = await UserModel.findOne({
			// 		where: idFacebook
			// 	})

			// 	if (user) {
			// 		return callback(null, user)
			// 	}

			// 	const newUser = {
			// 		username: profile._json.name,
			// 		email: profile._json.email,
			// 		idFacebook: profile._json.sub,
			// 		avatar: profile._json.picture
			// 	}
			// 	const userNew = await UserModel.create(newUser);

			// 	return callback(null, userNew)

			// } catch (error) {
			// 	return callback(error,profile)
			// }
			
		}
	)
);

passport.serializeUser((user, done) => {
	done(null, user);
});

passport.deserializeUser((user, done) => {

	done(null, user);
});
