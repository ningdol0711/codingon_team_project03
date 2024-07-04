const {Review, Product, User, Favorite} = require('../models');
//메인 페이지 렌더링
exports.main = async(req,res,next) => {
  //response에 
  //review 테이블의 모든 항목들의 rev_img, rev_text, rev_title, rev_rating만 모두 가져온다.
  //product 테이블의 모든 항목들의 prod_img, prod_name을 모두 가져온다.
  try{
    // review 테이블에서 필요한 데이터 가져오기
    const reviews = await Review.findAll({
      attributes: ['rev_idx','rev_img', 'rev_text', 'rev_title', 'rev_rating','prod_idx']
    });

    // product 테이블에서 필요한 데이터 가져오기
    const products = await Product.findAll({
      attributes: ['prod_idx','prod_img', 'prod_name','prod_text']
    });

    // 응답 데이터 구성
    res.json({
      code: 200,
      message: '메인 페이지 데이터 조회 성공',
      data: {
        reviews,
        products
      }
    });  
  }catch(err){
    next(err);
  }
}

exports.authCheck = async(req,res,next)=>{
  try{
    if(req.isAuthenticated()){
      user_idx = req.session.passport.user;
      
      const userId = await User.findOne({
        where:{ user_idx },
        attributes : ['user_ID'] 
      });
      return res.status(200).json({
        code:200,
        message:"로그인된 사용자입니다.",
        data:{
          isAuthenticated:true,
          currentUserId: userId
        }
      })
    }else{
      return res.status(200).json({
        code:200,
        message:"비로그인 사용자입니다.",
        data:{
          isAuthenticated:false
        }
      })
    };
  }catch(err){
    next(err);
  }
}
exports.adminCheck = async (req, res, next) =>{
  try{
    if(req.isAuthenticated() && req.user.role === 'admin'){
      return res.status(200).json({
        code: 200,
        message:'',
        data:{
          isAdmin:true
        }
      })
    }else {
      return res.status(200).json({
        code:200,
        message:'',
        data:{
          isAdmin:false,
        }
      })
    };
  }catch(err){
    next(err);
  }
}

//마이 페이지 렌더링
exports.mypage = async(req,res,next) =>{
  try{
    const user_idx = req.session.passport.user;
    //user_idx에 해당하는 User 테이블의 user_name, user_ID, user_points
    const userInfo = await User.findOne({
      where:{ user_idx },
      attributes : ['user_name', 'user_ID', 'user_points'] 
    });
    // user_idx에 해당하는 Favorite 테이블에서 prod_idx 가져오기
    const userFavorites = await Favorite.findAll({
      where: { user_idx },
      attributes: ['prod_idx']
    });    

    //user_idx에 포함되는 Favorite 테이블의 user_idx에 해당하는 prod_idx에 해당하는 prod_img, prod_name
    const favoriteProducts = await Product.findAll({
      where:{prod_idx : userFavorites.map(fav => fav.prod_idx) },
      attributes:['prod_idx','prod_img','prod_name']
    });

    // user_idx에 해당하는 Review 테이블의 rev_title, rev_name, rev_createdAt
    const userReviews = await Review.findAll({
      where: { user_idx },
      attributes: ['rev_idx', 'rev_createdAt', 'rev_title', 'rev_isAuth'],
      include: [
        {
          model:User,
          attributes:['user_ID'],
          required : true
        },
        {
          model: Product,
          attributes: ['prod_name'],
        }
      ]  
    })    
    // 응답 데이터 구성
    res.json({
      code: 200,
      message: '마이 페이지 데이터 조회 성공',
      data: {
        userInfo,
        favoriteProducts,
        userReviews
      }
    });
  }catch(err){
    next(err);
  }
}