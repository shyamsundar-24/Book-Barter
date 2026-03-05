const router = require("express").Router();
const Transaction = require("../models/Transaction");
const auth = require("../middleware/auth");

router.post("/", auth, async (req, res) => {
  const trade = await Transaction.create({
    offeredBook: req.body.offeredBook,     // user's book
    requestedBook: req.body.requestedBook, // other user’s book
    initiator: req.user.id,
    receiver: req.body.receiver
  });
  res.json(trade);
});


router.put("/:id/accept", auth, async (req, res) => {
  const trade = await Transaction.findByIdAndUpdate(
    req.params.id,
    { status: "Accepted" },
    { new: true }
  );
  res.json(trade);
});


router.put("/:id/reject", auth, async (req, res) => {
  const trade = await Transaction.findByIdAndUpdate(
    req.params.id,
    { status: "Rejected" },
    { new: true }
  );
  res.json(trade);
});


router.get("/incoming", auth, async (req, res) => {
  const trades = await Transaction.find({
    receiver: req.user.id
  })
  .populate("offeredBook")
  .populate("requestedBook")
  .populate("initiator");

  res.json(trades);
});


router.get("/sent", auth, async (req, res) => {
  const trades = await Transaction.find({
    initiator: req.user.id
  })
  .populate("offeredBook")
  .populate("requestedBook")
  .populate("receiver");

  res.json(trades);
});





module.exports = router;
