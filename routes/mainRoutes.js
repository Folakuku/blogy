const express = require("express");
const router = express.Router();
const mainController = require("../controllers/mainController");

// Homepage
router.get("/", mainController.getAllPosts);

// About page
router.get("/about", mainController.aboutPage);

module.exports = router;
