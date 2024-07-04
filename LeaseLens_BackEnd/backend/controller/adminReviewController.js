const { Review, User, Product } = require('../models');

// 인증되지 않은 모든 리뷰 리스트 조회
exports.getUnverifiedReviews = async (req, res) => {
  try {
    const reviews = await Review.findAll({
      where: { rev_isAuth: false },
      include: [
        {
          model: User,
          attributes: ['user_ID'], // 사용자 ID만 가져옵니다.
        },
        {
          model: Product,
          attributes: ['prod_name'], // 제품 이름만 가져옵니다.
        },
      ],
    });
    res.status(200).json({
      code: 200,
      message: '인증되지 않은 리뷰 리스트 조회 성공',
      data: reviews,
    });
  } catch (error) {
    res.status(500).json({
      code: 500,
      message: '서버 오류',
      error: error.message,
    });
  }
};

// 특정 리뷰 상세 조회
exports.getReviewDetails = async (req, res) => {
  console.log("req.params.id: " , req.params.id)
  try {
    const review = await Review.findOne({
      where: { rev_idx: req.params.id },
      include: [
        {
          model: User,
          attributes: ['user_ID'], // 사용자 ID만 가져옵니다.
        },
        {
          model: Product,
          attributes: ['prod_name'], // 제품 이름만 가져옵니다.
        },
      ],
    });
    if (!review) {
      return res.status(404).json({
        code: 404,
        message: '리뷰를 찾을 수 없습니다.',
      });
    }
    res.status(200).json({
      code: 200,
      message: '리뷰 상세 조회 성공',
      data: review,
    });
  } catch (error) {
    res.status(500).json({
      code: 500,
      message: '서버 오류',
      error: error.message,
    });
  }
};

// 리뷰 인증 처리
exports.verifyReview = async (req, res) => {
  try {
    const review = await Review.findOne({ where: { rev_idx: req.params.id } });
    if (!review) {
      return res.status(404).json({
        code: 404,
        message: '리뷰를 찾을 수 없습니다.',
      });
    }
    review.rev_isAuth = true;
    await review.save();
    res.status(200).json({
      code: 200,
      message: '리뷰가 인증되었습니다.',
    });
  } catch (error) {
    res.status(500).json({
      code: 500,
      message: '서버 오류',
      error: error.message,
    });
  }
};
