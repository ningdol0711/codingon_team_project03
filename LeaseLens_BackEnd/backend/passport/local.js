const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { User } = require('../models');
const bcrypt = require('bcryptjs');

module.exports = () => {
  passport.use(new LocalStrategy({
    usernameField: 'user_ID',
    passwordField: 'user_pw',
  }, async (user_ID, user_pw, done) => {
    try {
      const user = await User.findOne({
        where: { user_ID }
      });
      if (!user) {
        console.log('사용자를 찾을 수 없습니다.');
        return done(null, false, { message: '존재하지 않는 사용자입니다.' }); //message 출력
      }
      const result = await bcrypt.compare(user_pw, user.user_pw);
      if (result) {
        return done(null, user);
      }
      console.log('비밀번호가 틀렸습니다.');
      return done(null, false, { message: '비밀번호가 틀렸습니다.' }); //message 출력
    } catch (err) {
      return done(err);
    }
  }));
};
