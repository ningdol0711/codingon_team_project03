const fs = require('fs');
const dotenv = require('dotenv');

const envFile = `.env.${process.env.NODE_ENV}`;
if (fs.existsSync(envFile)) {
  dotenv.config({ path: envFile });
}//.env.${NODE_ENV} 존재할 시 연결해주기
dotenv.config(); // 기본 .env 파일 로드

module.exports = {
  development:{
    username:process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_NAME,
    host:process.env.DB_HOST,
    dialect:'mysql',
  },
  production:{
    username:process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_NAME,
    host:process.env.DB_HOST,
    dialect:'mysql',
  },
}


