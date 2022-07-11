const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const passport = require("passport");
const { ensureAuth, ensureGuest } = require("../config/auth");

// Using middleware
// router.use(logger);

// Registration Form
router.get("/register", ensureGuest, (req, res) => {
  res.render("create_user");
});

// Register New User
router.post("/register", ensureGuest, async (req, res) => {
  let { username, password, password2 } = req.body;
  if (!username || !password || !password2) {
    req.flash("error_msg", "Please fill out all fields");
    return res.redirect("/users/register");
  }
  username = username.toLowerCase();
  let errors = [];
  try {
    const user = await User.findOne({ username });
    if (user) {
      errors.push({ msg: "User already exists" });
      // req.flash("error", "User exists");
      // console.log(res.locals, req.flash());
      // return res.status(401).redirect("/users/register");
      return res.render("create_user", {
        errors,
        username,
        password,
        password2,
      });
    }
  } catch (err) {
    req.flash("error", "Something went wrong");
    console.log(err);
    return res.status(500).redirect("/users/register");
  }
  if (password.length < 6) {
    errors.push({ msg: "Password must be least six characters" });
    return res.render("create_user", { errors, username, password, password2 });
  }
  if (password !== password2) {
    errors.push({ msg: "Password must match" });
    return res.render("create_user", { errors, username, password, password2 });
  }
  try {
    const hash = await bcrypt.hash(password, 10);
    const newUser = new User({
      username: username,
      password: hash,
    });
    await newUser.save();
    req.flash("success_msg", "You are registered and can now login");
    res.status(201).redirect("/users/login");
  } catch (err) {
    errors.push(err);
    res
      .status(505)
      .render("create_user", { errors, username, password, password2 });
    console.log(err);
  }
});

// Login page
router.get("/login", ensureGuest, (req, res) => {
  res.render("login");
});

// Logging in using passport
router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/users/login",
    failureFlash: true,
  }),
  function (req, res) {
    // res.redirect(`/users/${req.user._id}`);
    res.redirect(`/users/dashboard`);
  }
);

// // Logging in
// router.post("/login", async (req, res) => {
//   try {
//     let username = req.body.username.toLowerCase();
//     const user = await User.findOne({
//       username,
//     });
//     !user && res.status(400).send("User does not exist");
//     const validated = await bcrypt.compare(req.body.password, user.password);
//     if (validated) {
//       // res.redirect(`/users/${user._id}`);
//       res.redirect(`/users/dashboard`);
//     } else res.send("wrong password");
//   } catch (err) {
//     console.log(err);
//   }
// });

// // Dashboard
// router.get("/dashboard", (req, res) => {
//   res.render("dashboard");
// });

// Dashboard secured with passport
router.get("/dashboard", ensureAuth, (req, res) => {
  const user = req.user;
  res.render("dashboard", { username: user.username });
});
router.get("/:id", ensureAuth, async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findById(id);
    res.render("dashboard", { username: user.username });
  } catch (error) {
    console.log(error);
  }
});

//Logout
router.get("/logout", ensureAuth, (req, res) => {
  req.logOut();
  req.flash("success_msg", "You are logged out");
  res.redirect("/users/login");
});
router.post("/logout", ensureAuth, (req, res) => {
  req.logOut();
  req.flash("success_msg", "You are logged out");
  res.redirect("/users/login");
});

//  Middleware to log the URL
function logger(req, res, next) {
  console.log(req.originalUrl);
  next();
}

module.exports = router;
