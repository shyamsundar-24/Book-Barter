const router = require("express").Router();
const Book = require("../models/Book");
const auth = require("../middleware/auth");
const multer = require("multer");

const upload = multer({ dest: "uploads/" });

// Create book
router.post("/", auth, upload.single("image"), async (req, res) => {
  const book = await Book.create({
    ...req.body,
    image: req.file.filename,
    owner: req.user.id
  });
  res.json(book);
});

// Get all books
router.get("/", async (req, res) => {
  const books = await Book.find().populate("owner");
  res.json(books);
});

// Delete book
router.delete("/:id", auth, async (req, res) => {
  await Book.findByIdAndDelete(req.params.id);
  res.json({ msg: "Deleted" });
});

module.exports = router;
