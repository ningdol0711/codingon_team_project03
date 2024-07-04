const express =require('express');
const router = express.Router();
const controller = require('../controller/productController');
const isLoggedIn = require('../Middlewares/isLoggedIn');

//제품 페이지 조회 및 검색
router.get('/', controller.main);

//제품 상세 페이지
router.get('/:prod_idx',controller.details);

//제품 찜하기
router.post('/:prod_idx/like', isLoggedIn, controller.like);

module.exports = router;