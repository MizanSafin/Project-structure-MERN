const express = require("express");
const router = express.Router();

//routing api
router.get("/home", (req, res) => {
  res.send(`Hello Express`);
});
//export Routing here
module.exports = router;
