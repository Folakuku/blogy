const { Blog } = require("../models/Blog");

// Get new blog
const getNewBlogForm = (req, res) => {
  res.render("new_blog");
};

// post new blog
const createNewPost = async (req, res) => {
  try {
    const blog = new Blog(req.body);
    await blog.save();
    res.redirect("/");
  } catch (err) {
    console.log(err);
  }
};

// view single post
const getSinglePost = (req, res) => {
  const id = req.params.id;
  Blog.findById(id)
    .then((result) => {
      res.render("blog", { blog: result });
    })
    .catch((err) => console.log(err));
};

// Update post form
const getUpdatePostForm = (req, res) => {
  const id = req.params.id;
  Blog.findById(id)
    .then((result) => {
      res.render("edit", { blog: result });
    })
    .catch((err) => console.log(err));
};

// Update post
const updatePost = (req, res) => {
  const id = req.params.id;
  Blog.findByIdAndUpdate(id, req.body)
    .then((result) => {
      res.redirect("/");
    })
    .catch((err) => console.log(err));
};

// Confirm before deleting
const confirmDelete = (req, res) => {
  const id = req.params.id;
  Blog.findById(id)
    .then((result) => res.render("delete", { blog: result }))
    .catch((err) => {
      console.log(err);
    });
};

// deleting
const deleteSinglePost = (req, res) => {
  const id = req.params.id;
  Blog.findByIdAndDelete(id)
    .then((result) => res.redirect("/"))
    .catch((err) => {
      console.log(err);
    });
};
// delete using API
const deleteByAPI = (req, res) => {
  const id = req.params.id;
  Blog.findByIdAndDelete(id)
    .then((result) => {
      res.json({
        status: true,
        message: "Post successfully deleted",
        redirect: "/",
      });
    })
    .catch((err) => {
      res.json({
        status: false,
        error: "There was an error",
        fullError: err,
      });
    });
};

module.exports = {
  getNewBlogForm,
  createNewPost,
  getSinglePost,
  getUpdatePostForm,
  updatePost,
  confirmDelete,
  deleteSinglePost,
  deleteByAPI,
};
