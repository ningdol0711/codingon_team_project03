const express = require('express');
const router = express.Router();
const adminReviewController = require('../controller/adminReviewController');
const isAdmin = require('../Middlewares/isAdmin');

// 관리자 전용 리뷰 리스트 조회 (인증되지 않은 리뷰만)
router.get('/', isAdmin, adminReviewController.getUnverifiedReviews);

// 특정 리뷰 상세 조회 및 인증 사진 확인
router.get('/:id', isAdmin, adminReviewController.getReviewDetails);

// 리뷰 인증 처리
router.post('/:id/auth', isAdmin, adminReviewController.verifyReview);


module.exports = router;
