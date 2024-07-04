import { BsHeartFill } from "react-icons/bs";
import { ProProps } from "../types/types";
import axios from "axios";
import { useEffect, useState } from "react";

const BACKHOST = process.env.REACT_APP_BACK_HOST;

export default function ProInfo({ product }: ProProps) {
  const prod_idx = window.location.pathname;
  const [productInfo, setProduct] = useState(Object);
  const [isLiked, setIsLiked] = useState(Boolean);

  const handleLikeClick = () => {
    axios.post(`${BACKHOST}${prod_idx}/like`);
    setIsLiked(!isLiked);
  }

  useEffect(() => {
    axios
      .get(`${BACKHOST}${prod_idx}`)
      .then((response) => {
        setProduct(response.data.data.productDetail);
        setIsLiked(response.data.data.isLiked);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, [isLiked]);

  return (
    <div className="proInfo">
      <section className="proInfo_proImg_container">
        <img src={product.prod_img} alt="" className="proInfo_proImg" />
      </section>
      <section className="proInfo_proInfo_des">
        <div>
          <p className="proInfo_proName">{product.prod_name}</p>
        </div>
        <p className="proInfo_proLease_price">월 렌트 비용 : {product.prod_price?.toString()}원</p>
        <p className="proInfo_proDes">
          {product.prod_text}
        </p>
      </section>
      <section className="proInfo_proLike_btn_box">
        <div className="proInfo_proLike_num">like : {productInfo.prod_likes}</div>
        <button className="proInfo_proLike_btn" onClick={() => {handleLikeClick()}} >
          <BsHeartFill fill={isLiked ? 'red' : 'transperant'} />
        </button>
      </section>
    </div>
  );
}
