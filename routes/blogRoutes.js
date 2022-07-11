const express = require("express");
const blogRouter = express.Router();
const blogController = require("../controllers/blogController");
const methodOverride = require("method-override");

// using method override
blogRouter.use(methodOverride("_method"));

// Get new blog form and post new blog
blogRouter
  .route("/new")
  .get(blogController.getNewBlogForm)
  .post(blogController.createNewPost);

// Get single post
blogRouter.route("/read/:id").get(blogController.getSinglePost);

// Editing
blogRouter
  .route("/edit/:id")
  .get(blogController.getUpdatePostForm)
  .put(blogController.updatePost);

// deleting
blogRouter
  .route("/delete/:id")
  .get(blogController.confirmDelete)
  .delete(blogController.deleteSinglePost);

// deleting with API
blogRouter.delete("/del/:id", blogController.deleteByAPI);

// // ================All HTTP Methods for a single route===================

// blogRouter.get("/:id", (req, res) => {
//   res.send(`Get blog with ID: ${req.params.id}`);
// });
// blogRouter.put("/:id", (req, res) => {
//   res.send(`Update blog with ID: ${req.params.id}`);
// });
// blogRouter.delete("/:id", (req, res) => {
//   res.send(`Delete blog with ID: ${req.params.id}`);
// });
// ===============================================

module.exports = { blogRouter };
