const express = require('express');
require('dotenv').config()
const app = express();
const bodyParser = require('body-parser');
const authRouter = require('./router/auth.router')
const cors = require('cors');
const userRouter = require('./router/user.router');
const categoryRouter = require('./router/category.router');
const productRouter = require('./router/product.router');
var passport = require('passport')
const upload = require('./middlewares/upload');
const accountRouter = require('./router/account.router');
const cartRouter = require('./router/cart.router');
const authSocial = require('./router/auth');
const paymentRouter = require('./router/payment.router');
const orderRouter = require('./router/order.router');
const orderDetailRouter = require('./router/orderDetail.router');
// var session = require('express-session');
const cookieSession = require('cookie-session')
const cookieParser = require('cookie-parser')
const passportStrategy = require("./passport");
// const db = require('./models/db.model');
// const UserModel = db.User;
const PORT = process.env.PORT || 5000;



app.use (function (req, res, next) {
  res.setHeader ("Access-Control-Allow-Origin", "*");
  res.setHeader ("Access-Control-Allow-Headers", "X-Request-With, Content-Type");
  next()
});
app.use(cookieParser());

app.use(
	cookieSession({
		name: "session",
		keys: ["cyberwolve"],
		maxAge: 24 * 60 * 60 * 100,
	})
);
// app.use(session({
//   secret: 'somethingsecretgoeshere',
//   resave: false,
//   saveUninitialized: true,
//   cookie: { secure: true }
// }));


// parse application/x-www-form-urlencoded
app.use( bodyParser.urlencoded({ extended: false }) );

// parse application/json
app.use(bodyParser.json());

app.use(passport.initialize());
app.use(passport.session());

app.use(
	cors({
		origin: "https://the-shop-men-reactjs.herokuapp.com",
		methods: "GET,POST,PUT,DELETE",
		credentials: true,
	})
);

// passport.use(new FacebookStrategy({
//   clientID: '615168920129120',
//   clientSecret: 'ed25dd98067b2f77efc6337c6697f26e',
//   callbackURL: "https://the-men-shop-fullstack.herokuapp.com/facebook/callback",
//   profileFields: ['id', 'displayName', 'photos', 'email']
// },
// async function(accessToken, refreshToken, profile, done) {
//     const user = await UserModel.findOne({
//       where: {
//         idFacebook: profile._json.id
//       }
//     })
//     if(user) {
//       return done(null, user)
//     }
//     const newUser = await UserModel.create({
//       idFacebook: profile._json.id,
//       username: profile._json.name,
//       email: profile._json.email,
//       avatar: profile._json.picture.data.url,
//       iamRole: "member"
//     })
//     return done(null, newUser)
//   }
// ));

// app.get("/login/success", (req, res) => {
//   console.log(req.user);
//   if(req.user) {
//     res.status(200).json({
//       success: true,
//       message: "successfully!",
//       user: req.user
//     })
//   }
// });

// app.get('/facebook',passport.authenticate('facebook', { scope: ['email'] }));

// app.get('/facebook/callback',passport.authenticate('facebook', {
//     failureRedirect: "https://the-shop-men-reactjs.herokuapp.com/login",
//     successRedirect: "https://the-shop-men-reactjs.herokuapp.com",
// })
// );


app.use("/public/images", express.static(__dirname + "/public/images"));

app.use(upload.single("image"));

app.use('/auth', authSocial)
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/categories", categoryRouter);
app.use("/api/v1/products", productRouter);
app.use("/api/v1/payments", paymentRouter);
app.use("/api/v1/orders", orderRouter);
app.use('/api/v1/account', accountRouter)
app.use("/api/v1/carts",cartRouter);
app.use("/api/v1/orderDetail", orderDetailRouter);

app.listen( PORT, () => {
    console.log(`Server is running on port ${PORT}....`);
})
