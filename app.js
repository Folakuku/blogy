const express = require("express");
const mongoose = require("mongoose");
require("ejs");
require("dotenv").config();
const { newSession } = require("./config/sessions");
const flash = require("connect-flash");
const passport = require("passport");
require("./config/passport")(passport);

const { blogRouter } = require("./routes/blogRoutes");
const userRouter = require("./routes/userRoutes");
// const mainRouter = require("./routes/mainRoutes");

const app = express();
const PORT = process.env.PORT;

// setting default app
app.set("view engine", "ejs");

// connecting to database
mongoose
  .connect(process.env.dbURI)
  .then((result) => {
    app.listen(PORT, () => {
      console.log(`Blog app listening on PORT ${PORT}!`);
    });
  })
  .catch((error) => console.log(error));

// setting middleware
app.use(express.static("public")); //This allows the server to access static files
app.use(express.urlencoded({ extended: true })); // This allows the server to read body
app.use(express.json()); // This allows the server to handle json requests
app.use(newSession); // Express Session
// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

app.use(flash()); // Connect-flash
// Global Variables for Flash Messages
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  res.locals.message = req.flash();
  next();
});

// handling routes
// app.use("/", mainRouter);
app.use("/", require("./routes/mainRoutes"));
app.use("/blogs", blogRouter);
app.use("/users", userRouter);

// 404 pages
app.all("*", (req, res) => res.status(404).render("404"));
