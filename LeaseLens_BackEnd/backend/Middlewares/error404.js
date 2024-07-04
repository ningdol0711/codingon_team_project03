const error404 = (req, res, next) => {
  const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
  error.status = 404;
  next(error); // 다음 미들웨어로 에러를 전달합니다.
}

module.exports = error404;
