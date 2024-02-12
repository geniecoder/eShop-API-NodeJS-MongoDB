const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/productController');

// router.get('/', (req, res) => {
//     res.send("hello here is all the products")
// });

router.get('/', ProductController.getAllProducts);
router.get('/:id', ProductController.getProductById);
router.post('/', ProductController.createProduct);
router.put('/:id', ProductController.updateProduct);
router.delete('/:id', ProductController.deleteProduct);

module.exports = router;
