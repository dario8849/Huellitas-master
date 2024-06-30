const express = require("express");
const router = express.Router();
const productoController = require("../controllers/productoController");

router.get("/", productoController.getAllProductos);
router.get("/:codigo", productoController.getProductoById);
router.post("/", productoController.createProducto);
router.put("/:codigo", productoController.updateProducto);
router.delete("/:codigo", productoController.deleteProducto);

module.exports = router;