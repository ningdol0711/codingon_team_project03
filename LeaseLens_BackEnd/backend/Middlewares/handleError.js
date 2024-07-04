const handleError = (err, req, res) => {
  console.error(err.stack); // 에러 스택을 콘솔에 출력합니다.

  // 기본적으로 사용할 에러 포맷
  const errorResponse = {
    code: err.status || 500, // HTTP 상태 코드를 사용하거나 기본적으로 500을 사용합니다.
    message: err.message || '서버 에러입니다', // 에러 메시지를 사용하거나 기본적인 메시지를 사용합니다.
    error: {
      type: err.name || 'ServerError', // 에러 유형을 사용하거나 기본적으로 'ServerError'를 사용합니다.
      message: err.message || '서버 에러입니다' // 상세한 메시지를 사용하거나 기본적인 메시지를 사용합니다.
    }
  };

  // 개발 환경에서는 상세한 에러 스택 정보를 클라이언트에게 전달합니다.
  if (process.env.NODE_ENV === 'development') {
    errorResponse.error.stack = err.stack;
  }

  res.status(errorResponse.code).json(errorResponse);
};

module.exports = handleError;