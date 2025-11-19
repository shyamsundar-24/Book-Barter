const router = require("express").Router();
const Transaction = require("../models/Transaction");
const auth = require("../middleware/auth");

router.post("/", auth, async (req, res) => {
  const trade = await Transaction.create({
    ...req.body,
    initiator: req.user.id
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
module.exports = router;
