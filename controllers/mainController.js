const { Blog } = require("../models/Blog");

const getAllPosts = async (req, res) => {
  Blog.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      res.render("home", { adjective: "cool", blogs: result });
    })
    .catch((error) => console.log(error));
};

const aboutPage = (req, res) => {
  res.render("about");
};

module.exports = { getAllPosts, aboutPage };
