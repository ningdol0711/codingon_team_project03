const db = require('../models'); // models 폴더에서 db 객체를 가져옵니다.

(async (req,res,next) => {
  try {
    await db.sequelize.sync(); // 모든 정의된 모델을 DB에 동기화합니다.

    // products 테이블에 데이터가 있는지 확인
    const existingProductsCount = await db.Product.count();
    if (existingProductsCount === 0) {
      // products 테이블이 비어 있는 경우에만 데이터 삽입
    const products = [
      {
        prod_category: '정수기',
        prod_img: 'https://lease-lens-bucket.s3.ap-northeast-2.amazonaws.com/products/prod1.png', 
        prod_name: '코웨이 아이콘 냉온정 얼음정수기',
        prod_text: '코웨이 아이콘 냉온정 얼음정수기는 현대적이고 기능적인 디자인으로 주거 공간에 아름다움을 더합니다. 이 제품은 우수한 성능과 혁신적인 기술을 통해 사용자에게 최상의 사용 경험을 제공합니다. 이 제품의 핵심 기능 중 하나는 다양한 물의 온도 선택이 가능한 점입니다. 냉수, 온수, 실온수를 모두 제공하여 사용자가 필요에 따라 쉽게 선택할 수 있습니다.',
        prod_likes: 0,
        prod_price: 80000,
      },
      {
        prod_category: '공기청정기',
        prod_img: 'https://lease-lens-bucket.s3.ap-northeast-2.amazonaws.com/products/prod2.png', 
        prod_name: '코웨이 듀얼클린 제습공기청정기',
        prod_text: '코웨이 듀얼클린 제습공기청정기는 현대적이고 세련된 디자인으로 주거 공간에 고급스러움을 더하는 동시에, 강력한 공기청정과 제습 기능을 제공하여 사용자의 건강과 편안함을 책임집니다. 이 제품은 뛰어난 듀얼클린 기술을 기반으로 하여 공기 중의 다양한 유해 물질을 효과적으로 제거합니다. ',
        prod_likes: 0,
        prod_price: 110000,
      },
      {
        prod_category: '공기청정기',
        prod_img: 'https://lease-lens-bucket.s3.ap-northeast-2.amazonaws.com/products/prod3.png', 
        prod_name: '삼성 비스포크 큐브 에어 인피니트 라인 공기청정기 30평형',
        prod_text: '삼성 비스포크 큐브 에어 인피니트 라인 공기청정기는 최신 기술과 혁신적인 디자인을 결합하여 공기 청정과 관리를 목적으로 하는 고급형 공기청정기입니다. 이 제품은 다양한 기능과 성능을 제공하여 사용자에게 깨끗하고 건강한 실내 환경을 제공합니다.',
        prod_likes: 0,
        prod_price: 40000,
      },
      {
        prod_category: '청소기',
        prod_img: 'https://lease-lens-bucket.s3.ap-northeast-2.amazonaws.com/products/prod4.png', 
        prod_name: '삼성 비스포크 제트 AI 무선청소기 310W',
        prod_text: '삼성 비스포크 제트 AI 무선청소기 310W는 혁신적인 기술과 세련된 디자인을 결합하여 사용자에게 뛰어난 청소 경험을 제공하는 제품입니다. 이 청소기는 강력한 310W 디지털 인버터 모터를 탑재하여 탁월한 흡입력을 제공합니다.',
        prod_likes: 0,
        prod_price: 70000,
      },
      {
        prod_category: '에어컨',
        prod_img: 'https://lease-lens-bucket.s3.ap-northeast-2.amazonaws.com/products/prod5.png', 
        prod_name: '삼성 비스포크 윈도우핏 창문형 에어컨 6평형',
        prod_text: '삼성 비스포크 윈도우핏 창문형 에어컨 6평형은 현대적인 디자인과 고급스러운 기능을 갖춘 창문형 에어컨 제품입니다. 이 제품은 주거 공간이나 사무실의 창문에 간편하게 설치할 수 있어, 공간을 효과적으로 활용할 수 있습니다.',
        prod_likes: 0,
        prod_price: 80000,
      },
      {
        prod_category: '세탁기',
        prod_img: 'https://lease-lens-bucket.s3.ap-northeast-2.amazonaws.com/products/prod6.png', 
        prod_name: '삼성 비스포크 그랑데 세탁기 AI',
        prod_text: '삼성 비스포크 그랑데 세탁기 AI는 최신 기술과 혁신적인 디자인을 결합하여 사용자에게 뛰어난 세탁 경험을 제공하는 세탁기입니다. 이 제품은 다양한 고급 기능을 탑재하여 효율적인 세탁을 가능하게 하며, 스마트하고 편리한 사용자 경험을 제공합니다.',
        prod_likes: 0,
        prod_price: 120000,
      },
      {
        prod_category: '냉장고',
        prod_img: 'https://lease-lens-bucket.s3.ap-northeast-2.amazonaws.com/products/prod7.png', 
        prod_name: '삼성 비스포크 4도어 냉장고',
        prod_text: '삼성 비스포크 4도어 냉장고는 현대 주방의 필수품으로, 최신 기술과 디자인을 결합하여 사용자에게 탁월한 경험을 제공합니다. 이 냉장고는 매우 스타일리시하며, 고급스러운 외관과 다양한 컬러 옵션으로 주방 인테리어에 잘 어울립니다.',
        prod_likes: 0,
        prod_price: 60000,
      },
      {
        prod_category: '냉장고',
        prod_img: 'https://lease-lens-bucket.s3.ap-northeast-2.amazonaws.com/products/prod8.png', 
        prod_name: '삼성 냉장고 300L',
        prod_text: '삼성의 300L 용량 냉장고는 소형 가정용으로 설계된 제품으로, 실용적인 기능과 현대적인 디자인을 갖추고 있습니다. 이 제품은 공간 효율성을 극대화하기 위해 실내 구성이 잘 조정되어 있습니다.',
        prod_likes: 0,
        prod_price: 40000,
      },
      {
        prod_category: '세탁기',
        prod_img: 'https://lease-lens-bucket.s3.ap-northeast-2.amazonaws.com/products/prod9.png', 
        prod_name: '삼성 그랑데 통버블 세탁기 10kg',
        prod_text: '삼성 그랑데 통버블 세탁기 10kg는 현대적인 기술과 사용자 친화적인 기능을 갖춘 대용량 세탁기입니다. 이 세탁기는 10kg의 대용량으로, 대가족이나 많은 양의 세탁물을 처리할 수 있어 가정 생활에서 매우 유용합니다.',
        prod_likes: 0,
        prod_price: 90000,
      },
      {
        prod_category: 'TV',
        prod_img: 'https://lease-lens-bucket.s3.ap-northeast-2.amazonaws.com/products/prod10.png', 
        prod_name: '삼성 The Serif QLED 65인치 TV',
        prod_text: '삼성 The Serif QLED 65인치 TV는 독특하고 세련된 디자인과 최신 기술을 결합한 프리미엄 TV입니다. 이 TV는 고유의 아이코닉한 디자인을 자랑합니다. "서플라이" 디자이너 로닉 아란이 디자인한 The Serif는 전통적인 TV의 틀을 깨고 세로로 서있는 형태로, 방에 자연스럽게 어울리는 아름다운 물체로서의 역할을 합니다.',
        prod_likes: 0,
        prod_price: 50000,
      },
      {
        prod_category: 'TV',
        prod_img: 'https://lease-lens-bucket.s3.ap-northeast-2.amazonaws.com/products/prod11.png', 
        prod_name: '삼성 The Frame 75인치',
        prod_text: '삼성 The Frame 75인치 TV는 고급스러운 디자인과 혁신적인 기술을 결합한 프리미엄 TV 제품입니다. 이 TV는 그림을 감상하는 것처럼 TV를 감상할 수 있는 느낌을 주기 위해 디자인되었습니다.',
        prod_likes: 0,
        prod_price: 40000,
      },
      {
        prod_category: '에어컨',
        prod_img: 'https://lease-lens-bucket.s3.ap-northeast-2.amazonaws.com/products/prod12.png', 
        prod_name: '삼성 Q9000 스탠드 에어컨 17평형',
        prod_text: '삼성 Q9000 스탠드 에어컨 17평형은 고급스러운 디자인과 뛰어난 성능을 갖춘 공기 조화 기기입니다. 이 제품은 첨단 기술을 활용하여 효율적인 냉난방을 제공합니다.',
        prod_likes: 0,
        prod_price: 110000,
      },
      {
        prod_category: '청소기',
        prod_img: 'https://lease-lens-bucket.s3.ap-northeast-2.amazonaws.com/products/prod13.png', 
        prod_name: '로보락 Q Revo 로봇청소기',
        prod_text: '로보락 Q Revo 로봇청소기는 혁신적인 기술과 편리한 기능을 갖춘 스마트 홈 청소 도구입니다. 로보락 Q Revo는 먼저 강력한 청소 성능을 자랑합니다. 최대 3000Pa의 집진력을 제공하여 다양한 바닥 재질에서 효과적으로 먼지와 이물질을 제거할 수 있습니다.',
        prod_likes: 0,
        prod_price: 20000,
      },
      {
        prod_category: '정수기',
        prod_img: 'https://lease-lens-bucket.s3.ap-northeast-2.amazonaws.com/products/prod14.png', 
        prod_name: 'SK매직 원코크 냉온정 얼음물 정수기',
        prod_text: 'SK매직 원코크 냉온정 얼음물 정수기는 현대적인 디자인과 탁월한 기능을 결합한 고급 정수기입니다. 먼저, 이 제품은 냉수, 온수, 실온수를 제공하는 다기능 정수기로, 사용자의 다양한 필요에 맞춰 물을 편리하게 제공합니다.',
        prod_likes: 0,
        prod_price: 30000,
      },
      {
        prod_category: '에어컨',
        prod_img: 'https://lease-lens-bucket.s3.ap-northeast-2.amazonaws.com/products/prod15.png', 
        prod_name: 'LG 휘센 오브제컬렉션 위너 스탠드 에어컨',
        prod_text: 'LG 휘센 오브제컬렉션 위너 스탠드 에어컨은 현대적인 디자인과 강력한 성능을 자랑하는 스탠드형 에어컨입니다. 먼저, 이 제품은 LG의 휘센 기술을 기반으로 제작되어, 고급스러운 외관과 함께 최신 기술이 적용되어 있습니다.',
        prod_likes: 0,
        prod_price: 50000,
      },
      {
        prod_category: '정수기',
        prod_img: 'https://lease-lens-bucket.s3.ap-northeast-2.amazonaws.com/products/prod16.png', 
        prod_name: 'LG 퓨리케어 오브제컬렉션 맞춤출수 냉온정 정수기',
        prod_text: 'LG 퓨리케어 오브제컬렉션 맞춤출수 냉온정 정수기는 최신 기술과 세련된 디자인이 결합된 고급스러운 정수기입니다. 이 제품은 LG의 퓨리케어 기술을 기반으로 제작되어, 신선하고 깨끗한 물을 제공합니다. 냉수와 온수를 제공하며, 필터 교체가 간편하고 사용자가 원하는 수온을 선택할 수 있는 맞춤출수 기능을 갖추고 있습니다.',
        prod_likes: 0,
        prod_price: 40000,
      },
      {
        prod_category: '공기청정기',
        prod_img: 'https://lease-lens-bucket.s3.ap-northeast-2.amazonaws.com/products/prod17.png', 
        prod_name: 'LG 퓨리케어 360도 공기청정기 18평형',
        prod_text: 'LG 퓨리케어 360도 공기청정기는 최신 기술과 뛰어난 성능을 갖춘 공기청정기로, 주거나 상업 공간에서 공기 질을 개선하는 데 적합한 제품입니다. 이 공기청정기는 360도로 공기를 흡입하여 청정화하는 기능을 제공합니다.',
        prod_likes: 0,
        prod_price: 60000,
      },
      {
        prod_category: '세탁기',
        prod_img: 'https://lease-lens-bucket.s3.ap-northeast-2.amazonaws.com/products/prod18.png', 
        prod_name: 'LG 트롬 오브제컬렉션 세탁기',
        prod_text: 'LG 트롬 오브제컬렉션 세탁기는 혁신적인 기술과 세련된 디자인이 결합된 고급스러운 세탁기입니다. 이 세탁기는 LG의 최신 기술을 적용하여 세탁 효율성을 극대화하고 사용자 편의성을 높였습니다.',
        prod_likes: 0,
        prod_price: 90000,
      },
      {
        prod_category: '청소기',
        prod_img: 'https://lease-lens-bucket.s3.ap-northeast-2.amazonaws.com/products/prod19.png', 
        prod_name: 'LG 코드제로 R5 올인원타워 로봇청소기',
        prod_text: 'LG 코드제로 R5 올인원타워 로봇청소기는 현대적인 기술과 강력한 성능을 자랑하는 스마트 로봇청소기입니다. 이 제품은 LG의 최신 기술력을 바탕으로 하여, 집안의 다양한 바닥 재질에 맞춘 효율적인 청소를 가능하게 합니다.',
        prod_likes: 0,
        prod_price: 80000,
      },
      {
        prod_category: '냉장고',
        prod_img: 'https://lease-lens-bucket.s3.ap-northeast-2.amazonaws.com/products/prod20.png', 
        prod_name: 'LG 디오스 오브제컬렉션 노크온 냉장고',
        prod_text: 'LG 디오스 오브제컬렉션 노크온 냉장고는 현대적인 디자인과 첨단 기술이 결합된 프리미엄 냉장고입니다. 이 냉장고는 LG의 디오스 시리즈 중 하나로, 오브제컬렉션의 일환으로 독특한 외관 디자인과 고급 소재를 사용하여 현대적이고 세련된 느낌을 주는 제품입니다.',
        prod_likes: 0,
        prod_price: 70000,
      },
      {
        prod_category: 'TV',
        prod_img: 'https://lease-lens-bucket.s3.ap-northeast-2.amazonaws.com/products/prod21.png', 
        prod_name: 'LG OLED 스마트 TV 55인치',
        prod_text: 'LG OLED 스마트 TV 55인치는 최신 기술과 고급 디스플레이를 특징으로 하는 고해상도 텔레비전입니다. OLED 기술은 각 픽셀이 독립적으로 발광하므로 더욱 생생하고 정교한 화면을 제공합니다.',
        prod_likes: 0,
        prod_price: 20000,
      },
    ];

    for (const product of products) {
      await db.Product.create(product);
    }

    console.log('성공적으로 데이터베이스에 기본 제품 데이터를 INSERT 하였습니다.');
  }else{
    console.log('기본 제품 데이터가 이미 존재합니다.');
  }
  } catch (err) {
    next(err);
  }
})();
