module.exports = (req, res, next) => {
    if (req.isAuthenticated() && req.user.role === 'admin') {
      next();
    } else {
      res.status(403).json({
        code: 403,
        message: '관리자 권한이 필요합니다.',
        error: {}
      });
    }
  };
  