const { Review, User, Product, Comment } = require('../models');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const dotenv = require('dotenv');
const aws = require('aws-sdk');

const envFile = `.env.${process.env.NODE_ENV}`;
if (fs.existsSync(envFile)) {
  dotenv.config({ path: envFile });
}
dotenv.config();

// AWS S3 configuration
aws.config.update({
  accessKeyId: process.env.AWS_S3_KEY_ID,
  secretAccessKey: process.env.AWS_S3_ACCESS_KEY,
  region: process.env.AWS_S3_REGION,
});

const s3 = new aws.S3();

// 로컬 저장소 설정
const localStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = path.join(__dirname, '../uploads/reviews');
    fs.mkdirSync(uploadPath, { recursive: true });
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({
  storage: localStorage,
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB 파일 사이즈 제한
}).fields([{ name: 'rev_img', maxCount: 3 }, { name: 'rev_authImg', maxCount: 3 }]);

// 이미지 업로드 핸들러 (최대 3개의 이미지 파일)
exports.uploadImages = (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      console.error('Error during file upload:', err);
      return res.status(500).json({ error: err.message });
    }
    try {
      const files = req.files['rev_img'] || [];
      console.log('Received files:', files);

      // 로컬 파일 경로 반환
      const imageUrls = files.map(file => `${process.env.CURRENT_ADDRESS}/uploads/reviews/${file.filename}`);
      console.log('Image URLs:', imageUrls);

      res.json({ urls: imageUrls[0] });
    } catch (error) {
      console.error('Error uploading images:', error);
      res.status(500).json({ error: error.message });
    }
  });
};
// Function to upload files to S3
const uploadToS3 = (file) => {
  return new Promise((resolve, reject) => {
    const fileStream = fs.createReadStream(file.path);

    const params = {
      Bucket: process.env.AWS_S3_BUCKET,
      Key: `reviews/${Date.now()}-${path.basename(file.path)}`,
      Body: fileStream,
      ContentType: file.mimetype,
      ACL: 'public-read',
    };

    s3.upload(params, (err, data) => {
      if (err) {
        reject(err);
      }
      resolve(data.Location);
    });
  });
};


// 리뷰 작성
exports.writeReview = (req, res, next) => {
  upload(req, res, async function (err) {
    if (err) {
      return next(err); // 업로드 오류 처리
    }
    const { rev_title, prod_idx, rev_text, rev_rating } = req.body;
    const rev_authImg_files = req.files['rev_authImg'] || [];
    console.log(req.body);
    if (!rev_title || !prod_idx || !rev_text || !rev_rating || rev_authImg_files.length === 0) {
      // 필수 필드가 누락된 경우 로컬 파일 삭제
      const filesToDelete = [...(req.files['rev_img'] || []), ...rev_authImg_files];
      filesToDelete.forEach(file => fs.unlinkSync(file.path));
      return res.status(400).json({
        code: 400,
        message: '필수 필드를 모두 입력해 주세요.',
        data: {}
      });
    }
    try {
      const user_idx = req.session.passport.user;
      if (!user_idx) {
        // 로그인하지 않은 경우 로컬 파일 삭제
        const filesToDelete = [...(req.files['rev_img'] || []), ...rev_authImg_files];
        filesToDelete.forEach(file => fs.unlinkSync(file.path));
        return res.status(403).json({
          code: 403,
          message: '리뷰 작성 권한이 없습니다. 로그인해주세요!',
          data: {}
        });
      }
      const rev_img_files = req.files['rev_img'] || [];
      const rev_img_urls = await Promise.all(rev_img_files.map(file => uploadToS3(file)));
      const rev_authImg_urls = await Promise.all(rev_authImg_files.map(file => uploadToS3(file)));
      // S3에 업로드한 후 로컬 파일 삭제
      [...rev_img_files, ...rev_authImg_files].forEach(file => fs.unlinkSync(file.path));
      const rev_img = rev_img_urls.join(',');
      const rev_authImg = rev_authImg_urls.join(',');
      const newReview = await Review.create({
        rev_title,
        user_idx,
        prod_idx,
        rev_isAuth: false,
        rev_text,
        rev_createdAt: new Date(),
        rev_img,
        rev_authImg,
        rev_rating
      });
      res.json({
        code: 200,
        message: '리뷰가 성공적으로 작성되었습니다.',
        data: {
          review: newReview
        }
      });
    } catch (err) {
      console.error('새로운 리뷰 생성 에러', err);
      next(err);
    }
  });
};

// reviews 목록 가져오기
exports.main = async (req, res, next) => {
  try {
    const title = req.query.title || 'all';
    const condition = title === 'all' ? {} : { rev_title: title };

    const reviews = await Review.findAll({
      order:[['rev_createdAt', 'desc']],
      where: condition,
      attributes: ['rev_idx', 'rev_createdAt', 'rev_title', 'rev_isAuth'],
      include: [
        {
          model: User,
          attributes: ['user_ID'],
          required: true
        },
        {
          model: Product,
          attributes: ['prod_name'],
        }
      ]
    });

    res.json({
      code: 200,
      message: '리뷰 목록을 성공적으로 가져왔습니다.',
      data: {
        reviews: reviews
      }
    });
  } catch (err) {
    next(err);
  }
};


// 리뷰 삭제
exports.deleteReview = async (req, res, next) => {
  try {
    const user_idx = req.session.passport.user;
    const rev_idx = req.params.rev_idx;

    const review = await Review.findByPk(rev_idx);
    if (!review) {
      return res.status(404).json({
        code: 404,
        message: '리뷰를 찾을 수 없습니다.',
        data: {}
      });
    }

    if (review.user_idx !== user_idx) {
      return res.status(403).json({
        code: 403,
        message: '리뷰를 삭제할 권한이 없습니다.',
        data: {}
      });
    }

    if (review.rev_img) {
      const revImgUrls = review.rev_img.split(',');
      for (const imgUrl of revImgUrls) {
        const key = imgUrl.split('.com/')[1];
        await s3.deleteObject({
          Bucket: process.env.AWS_S3_BUCKET,
          Key: key
        }).promise();
      }
    }

    if (review.rev_authImg) {
      const revAuthImgUrls = review.rev_authImg.split(',');
      for (const authImgUrl of revAuthImgUrls) {
        const key = authImgUrl.split('.com/')[1];
        await s3.deleteObject({
          Bucket: process.env.AWS_S3_BUCKET,
          Key: key
        }).promise();
      }
    }

    await Comment.destroy({
      where: {
        rev_idx: rev_idx
      }
    });

    await Review.destroy({
      where: {
        rev_idx: rev_idx
      }
    });

    res.json({
      code: 200,
      message: '리뷰가 성공적으로 삭제되었습니다.',
      data: {}
    });
  } catch (err) {
    next(err);
  }
};

// 리뷰 상세 페이지
exports.reviewDetails = async (req, res, next) => {
  try {
    const rev_idx = req.params.rev_idx;

    const review = await Review.findOne({
      where: { rev_idx },
      attributes: ['rev_idx','rev_isAuth', 'rev_text', 'rev_img', 'rev_title', 'rev_rating'],
      include: [
        {
          model: Product,
          attributes: ['prod_name'],
          required: true
        },
        {
          model: Comment,
          attributes: ['com_idx', 'com_text', 'createdAt'],
          include: [
            {
              model: User,
              attributes: ['user_ID'],
              required: true
            }
          ]
        },
        {
          model: User, // Review를 작성한 사용자의 user_ID 가져오기
          attributes: ['user_ID'],
          required: true
        }
      ]
    });

    if (!review) {
      return res.status(404).json({
        code: 404,
        message: '리뷰를 찾을 수 없습니다.',
        data: {}
      });
    }

    res.json({
      code: 200,
      message: '리뷰 상세 정보를 성공적으로 가져왔습니다.',
      data: {
        review
      }
    });
  } catch (err) {
    next(err);
  }
};

// 댓글 작성
exports.writeComments = async (req, res, next) => {
  try {
    const user_idx = req.session.passport.user;
    const rev_idx = req.params.rev_idx;
    const { com_text } = req.body;

    if (!com_text) {
      return res.status(400).json({
        code: 400,
        message: '댓글 내용을 입력해 주세요.',
        data: {}
      });
    }

    const newComment = await Comment.create({
      rev_idx,
      user_idx,
      com_text,
      com_createdAt: new Date()
    });

    res.json({
      code: 200,
      message: '댓글이 성공적으로 작성되었습니다.',
      data: {
        comment: newComment
      }
    });
  } catch (err) {
    next(err);
  }
};

// 댓글 수정
exports.updateComments = async (req, res, next) => {
  try {
    const user_idx = req.session.passport.user;
    const rev_idx = req.params.rev_idx;
    const com_idx = req.params.com_idx;
    const { com_text } = req.body;

    const comment = await Comment.findOne({ where: { com_idx, rev_idx, user_idx } });
    if (!comment) {
      return res.status(404).json({
        code: 404,
        message: '댓글을 찾을 수 없습니다.',
        data: {}
      });
    }

    if (!com_text) {
      return res.status(400).json({
        code: 400,
        message: '댓글 내용을 입력해 주세요.',
        data: {}
      });
    }

    comment.com_text = com_text;
    await comment.save();

    res.json({
      code: 200,
      message: '댓글이 성공적으로 수정되었습니다.',
      data: {
        comment
      }
    });
  } catch (err) {
    next(err);
  }
};

// 댓글 삭제
exports.deleteComments = async (req, res, next) => {
  try {
    const user_idx = req.session.passport.user;
    const rev_idx = req.params.rev_idx;
    const com_idx = req.params.com_idx;

    const comment = await Comment.findOne({ where: { com_idx, rev_idx} });
    if (!comment) {
      return res.status(404).json({
        code: 404,
        message: '댓글을 찾을 수 없습니다.',
        data: {}
      });
    }

    if (comment.user_idx !== user_idx) {
      return res.status(403).json({
        code: 403,
        message: '댓글을 삭제할 권한이 없습니다.',
        data: {}
      });
    }

    await Comment.destroy({
      where: {
        com_idx,
        rev_idx,
        user_idx
      }
    });

    res.json({
      code: 200,
      message: '댓글이 성공적으로 삭제되었습니다.',
      data: {}
    });
  } catch (err) {
    next(err);
  }
};