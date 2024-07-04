import Footer from "../components/Footer";
import Header from "../components/Header";
import RevCard from "../components/RevCard";
import { FaArrowRight } from "react-icons/fa6";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { useEffect, useState } from "react";
import axios from "axios";
import { ProddbProps } from "../types/productstypes";
import { RevdbProps } from "../types/reviewtypes";

const BACKHOST = process.env.REACT_APP_BACK_HOST;

export default function MainPage() {
  const [products, setProducts] = useState<ProddbProps[]>([]);
  const [reviews, setReviews] = useState<RevdbProps[]>([]);

  useEffect(() => {
    axios
      .get(`${BACKHOST}/main`)
      .then((response) => {
        setProducts(response.data.data.products);
        setReviews(response.data.data.reviews);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  return (
    <>
      <Header />
      <Swiper
        modules={[Navigation, Pagination, A11y, Autoplay, Scrollbar]}
        spaceBetween={0}
        slidesPerView={1}
        navigation
        autoplay={{
          delay: 10000,
          disableOnInteraction: false,
        }}
        scrollbar={{ draggable: true }}
      >
        {products.map((product) => {
          const filteredReviews = reviews.filter(
            (review) => review.prod_idx === product.prod_idx
          );
          return (
            <SwiperSlide>
              <main className="mainPage_main">
                <div className="mainPage_imgBox_min">
                  <img
                    src={product.prod_img}
                    alt=""
                    className="mainPage_img_min mainPage_img1_min"
                  />
                </div>
                <section className="mainPage_leftBox">
                  <div className="mainPage_proInfo_box">
                    <p className="mainPage_proName">{product.prod_name}</p>
                  </div>
                  <div className="mainPage_proInfo_link">
                    <a
                      href={`/products/${product.prod_idx}`}
                      className="proInfo_link"
                    >
                      렌탈하러 가기 <FaArrowRight />
                    </a>
                  </div>
                  <div className="mainPage_proInfo_proDes">
                    <p className="mainPage_proDes">{product.prod_text}</p>
                  </div>
                  <Swiper
                    modules={[
                      Autoplay,
                    ]}
                    spaceBetween={0}
                    slidesPerView={1}
                    autoplay={{
                      delay: 5000,
                      disableOnInteraction: false,
                    }}
                    className="mainPage_swiper"
                  >
                    {filteredReviews.length > 0 ? (
                      filteredReviews.map((review) => (
                        <SwiperSlide>
                          <RevCard key={review.rev_idx} review={review} />
                        </SwiperSlide>
                      ))
                    ) : (
                      <p>작성된 리뷰가 없습니다.</p>
                    )}
                  </Swiper>
                </section>
                <section className="mainPage_rightBox">
                  <div className="mainPage_imgBox">
                    <img
                      src={product.prod_img}
                      alt=""
                      className="mainPage_img mainPage_img1"
                    />
                  </div>
                  <div className="mainPage_imgBox">
                    <img
                      src={product.prod_img}
                      alt=""
                      className="mainPage_img mainPage_img2"
                    />
                  </div>
                </section>
              </main>
            </SwiperSlide>
          );
        })}
      </Swiper>
      <Footer />
    </>
  );
}
