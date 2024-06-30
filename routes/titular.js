const express = require("express");
const router = express.Router();
const titularController = require("../controllers/titularController");

router.get("/", titularController.getAllTitulares);
router.get("/:id", titularController.getTitularById);
router.post("/", titularController.createTitular);
router.put("/:id", titularController.updateTitular);
router.delete("/:id", titularController.deleteTitular);

module.exports = router;