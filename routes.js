const express = require("express");
const router = express.Router();
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, res, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, res, cb) => {
    cb(null, Date.now() + ".jpg");
  },
});

const upload = multer({ storage: storage });

router.post("/addimage", upload.single("imag"), (req, res) => {
  try {
    res.json({ path: req.file.filename });
  } catch (e) {
    res.json({ error: e });
  }
});


module.exports = router;