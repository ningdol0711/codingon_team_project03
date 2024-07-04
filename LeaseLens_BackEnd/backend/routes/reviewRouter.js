const express = require('express');
const router = express.Router();

const controller = require('../controller/reviewController');
const isLoggedIn = require('../Middlewares/isLoggedIn');

// reviews 모아보기
router.get('/', controller.main);

// review 작성하기(제출)
router.post('/', isLoggedIn, controller.writeReview);

// image 경로 handler
router.post('/img', isLoggedIn, controller.uploadImages);

// review 글 삭제하기
router.delete('/:rev_idx', isLoggedIn, controller.deleteReview);

// 리뷰 상세 페이지
router.get('/:rev_idx', controller.reviewDetails);

// 리뷰 댓글 작성하기
router.post('/:rev_idx/comments', isLoggedIn, controller.writeComments);

// 리뷰 댓글 수정하기
router.patch('/:rev_idx/comments/:com_idx', isLoggedIn, controller.updateComments);

// 리뷰 댓글 삭제하기
router.delete('/:rev_idx/comments/:com_idx', isLoggedIn, controller.deleteComments);

module.exports = router;
