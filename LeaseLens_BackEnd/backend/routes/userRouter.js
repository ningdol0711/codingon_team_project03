const express = require('express');
const router = express.Router();
const controller = require('../controller/userController');
const isLoggedIn = require('../Middlewares/isLoggedIn');
const isNotLoggedIn = require('../Middlewares/isNotLoggedIn');
const isAdmin = require('../Middlewares/isAdmin');


// 회원가입
router.post('/register', isNotLoggedIn, controller.register);

// 로그인
router.post('/login', isNotLoggedIn, controller.login);

// 로그아웃
router.get('/logout', isLoggedIn, controller.logout);

// 회원탈퇴
router.delete('/quit', isLoggedIn, controller.quit);

module.exports = router;
