module.exports = (req, res, next) => {
  console.log("isLoggedIn : ",req.isAuthenticated())
    if (req.isAuthenticated()) {
      next();
    } else {
      res.status(403).json({
        code:403,
        message:'로그인이 필요합니다.',
        error:{}
      });
    }
  };
  