module.exports = (req, res, next) => {
    if (!req.isAuthenticated()) {
      next();
    } else {
      res.status(403).json({
        code:403,
        message:'로그인하지 않은 사용자만 접근 가능합니다.',
        error:{}
      });
    }
  };
  