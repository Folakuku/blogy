const { default: mongoose } = require("mongoose");

const Schema = require("mongoose").Schema;

blogSchema = new Schema(
  {
    title: { type: String, required: true, unique: true },
    snippet: { type: String },
    content: { type: String, required: true },
  },
  { timestamps: true }
);

const Blog = mongoose.model("Blog", blogSchema);
module.exports = { Blog };
