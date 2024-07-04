const { User } = require('../models');
const bcrypt = require('bcrypt');

module.exports = class AdminSetup{
    async createAdmin(){
        try{
            const adminExist= await User.findOne({ where : { user_ID: 'admin'} });
            if(!adminExist){
                const hashedPassword = await bcrypt.hash('adminpassword', 10);
                await User.create({
                    user_ID:'admin',
                    user_name: 'Admin',
                    user_pw: hashedPassword,
                    role: 'admin',
                });
                console.log('관리자 계정이 생성되었습니다.');
            }else {
                console.log('관리자 계정이 이미 존재합니다.');
            }
        }catch (error){
            console.error("관리자 계정 생성에 오류가 생겼습니다: ", error);
        }
    }
}
