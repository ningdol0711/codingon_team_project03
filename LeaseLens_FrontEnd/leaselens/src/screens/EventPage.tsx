import Header from '../components/Header'
import Banner from '../components/Banner'
import Footer from '../components/Footer';

export default function EventPage() {
    const handleBannerClick = (message: string) => {
        alert(message);
    };
    return (
        <>
            <Header />
            <div className='eventpg_container'>
                <p>이벤트 모아보기</p>
                <div className="eventpg_banner_container">
                    <Banner bannerTxt={'정수기 6월 한달 10% 할인'} onClick={() => handleBannerClick('이벤트 준비 중 입니다.')} />
                    <Banner bannerTxt={'에어컨 설치 경쟁의 서막'} onClick={() => handleBannerClick('이벤트 준비 중 입니다.')} />
                    <Banner bannerTxt={'로봇청소기 파격 할인 대전'} onClick={() => handleBannerClick('이벤트 준비 중 입니다.')} />
                    <Banner bannerTxt={'출석체크 이벤트'} onClick={() => handleBannerClick('이벤트 준비 중 입니다.')} />
                </div>
            </div>
            <Footer />
        </>
    )
}
