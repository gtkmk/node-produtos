const express = require('express');
const { route } = require('../app');
const produtosController = require('../controllers/produto.controller');

const router = express.Router();

router.post("/", produtosController.save);
router.get("/:id", produtosController.show);
router.get("/", produtosController.index);
router.patch("/:id", produtosController.update);
router.delete("/:id", produtosController.destroy);

module.exports = router;