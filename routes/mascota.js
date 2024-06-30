const express = require("express");
const router = express.Router();
const mascotaController = require("../controllers/mascotaController");

router.get("/", mascotaController.getAllMascotas);
router.get("/:id", mascotaController.getMascotaById);
router.post("/", mascotaController.createMascota);
router.put("/:id", mascotaController.updateMascota);
router.delete("/:id", mascotaController.deleteMascota);

module.exports = router;