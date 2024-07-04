const bcrypt = require("bcrypt");
const passport = require("passport");
const { User, Review, Comment, Favorite } = require("../models");

//회원가입
exports.register = async (req, res, next) => {
  console.log("Request Body:", req.body);
  const { user_name, user_ID, user_pw, confirm_pw } = req.body;
  if (user_pw !== confirm_pw) {
    return res.status(400).json({
      code:400,
      message: "비밀번호가 일치하지 않습니다",
      error:{}
    });
  }
  try {
    const existingUser = await User.findOne({ where: { user_ID } });
    if (existingUser) {
      return res.status(400).json({ 
        code:400,
        message: "사용 중인 아이디입니다",
        error:{}
      });
    }

    const hashedPassword = await bcrypt.hash(user_pw, 10);
    const newUser = await User.create({
      user_ID,
      user_name,
      user_pw: hashedPassword,
      user_points: 0, //초기 포이트 0으로 설정
    });
    res.status(201).json({ 
      code:201,
      message: "회원 가입 성공", 
      data : {user:newUser} 
    });
  } catch (err) {
    next(err);
  }
};

//로그인
exports.login = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({ 
        code : 401,
        message: info.message,
        data:{}
      });
    }
    return req.login(user, (loginErr) => {
      if (loginErr) {
        return next(loginErr);
      }
      return res.status(200).json({
        code:200,
        message: "로그인 성공",
        data:{
          user : user,
          session : req.session.passport.user
        } });
    });
  })(req, res, next);
};

//로그아웃
exports.logout = (req, res, next) => {

  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.session.destroy();
    res.status(200).json({ 
      code:200,
      message: "로그아웃 성공",
      data:{}
    });
  });
};

//회원탈퇴
exports.quit = async (req, res, next) => {
  const userId = req.user.user_idx;
  const transaction = await User.sequelize.transaction();

  try {
    await Review.destroy({where:{user_idx : userId}, transaction});
    await Comment.destroy({where:{user_idx : userId}, transaction});
    await Favorite.destroy({where:{user_idx : userId}, transaction});

    await User.destroy({ where: { user_idx: userId }, transaction });

    await transaction.commit();

    req.logout(function (err) {
      if (err) {
        return next(err);
      }

      req.session.destroy((err) => {
        if (err) {
          return next(err);
        }
        res.status(200).json({ 
          code:200,
          message: "회원탈퇴 성공",
          data:{}
        });
      });
    });
  } catch (err) {
    await transaction.rollback();
    next(err);
  }
};
