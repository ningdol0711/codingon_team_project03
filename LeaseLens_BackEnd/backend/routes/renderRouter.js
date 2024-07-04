const express =require('express');
const router = express.Router();
const controller = require('../controller/renderController');
const isLoggedIn = require('../Middlewares/isLoggedIn');

//메인 페이지 렌더링
router.get('/main', controller.main);

//로그인 비로그인 상태 렌더링
router.get('/auth/check', controller.authCheck);

//관리자 계정으로 로그인 상태 렌더링
router.get('/auth/adminCheck', controller.adminCheck);

//마이 페이지 렌더링
router.get('/mypage', isLoggedIn, controller.mypage);

module.exports = router;