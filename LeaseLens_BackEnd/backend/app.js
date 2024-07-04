const express = require('express');
const session = require('express-session');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const passport= require('passport')
const cors = require('cors');
const bodyParser= require('body-parser')
const path = require('path');

const db =require('./models');
const error404 = require('./Middlewares/error404');
const handleError = require('./Middlewares/handleError');
const passportConfig=require('./passport');
const insertProducts = require('./seeders/insertProducts'); // 시더 파일을 가져옵니다.
const MySQLStore = require('express-mysql-session')(session);
const {userRouter, productRouter,renderRouter,reviewRouter, adminReviewRouter}= require('./routes');
const AdminSetup = require('./config/adminSetup');

const PORT = 8080;

dotenv.config();

const env = process.env.NODE_ENV;
console.log(env);
const config = require('./config/config')[env];

const app = express();
db.sequelize
  .sync()
  .then(()=>{
    console.log('db 연결 성공');
  }).catch(err=>{
    console.error('db 연결 실패', err);
  });
  
passportConfig(); //passport config 초기화

app.use(cors({
  origin: process.env.FRONT_ADDRESS,
  credentials: true,
}));

//cookie parser를 활용하여 쿠키 해석하기
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser(process.env.COOKIE_SECRET));

app.use(session({
  secret:process.env.COOKIE_SECRET,
  resave:false,
  saveUninitialized:false, // 로그인하지 않은 사용자에게 세션을 저장하지 않음
  cookie:{ 
    maxAge:3600000,
    secure:false, //HTTPS 사용할 때 값을 true로 바꿔주기
    httpOnly:true,
  },                 
    store: new MySQLStore({
      host: config.host,
      user: config.username,
      password: config.password,
      database: config.database
    }),
}),
);
app.use(passport.initialize());
app.use(passport.session());

// 기본 body-parser 설정
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// 정적 파일 경로 설정 (업로드된 파일 접근 가능하게)
app.use('/uploads/reviews', express.static(path.join(__dirname, 'uploads/reviews')));

app.use('/users', userRouter);
app.use('/reviews',reviewRouter);
app.use('/products', productRouter);
app.use('/admin', adminReviewRouter);
app.use('/', renderRouter);

//404 에러처리 미들웨어
app.use(error404);

//기타 에러처리 미들웨어
app.use(handleError);

app.listen(PORT,()=>{
  console.log(`${PORT}번 포트에서 서버 실행중 . . . `);
if(process.env.CREATE_ADMIN === 'true'){
  const adminSetup = new AdminSetup();
  adminSetup.createAdmin();                 //Create admin account on server start
}
});