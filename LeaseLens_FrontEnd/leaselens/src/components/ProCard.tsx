import { Link } from "react-router-dom";
import { ProProps } from '../types/types';

export default function ProCard({ width, height, product }: ProProps) {
  return (
    <div className='proCard' style={{ width, height }}>
      <section className="proCard_img_container">
        <img src={product?.prod_img} alt="" className="proCard_img" />
      </section>
      <section className="proCard_name_section">
        <p className='proCard_pro_name'>{product?.prod_name}</p>
      </section>
      <section className="proCard_button_section">
        <Link to={`/products/${product?.prod_idx}`}>
          <button className='proCard_button'>제품 보기</button>
        </Link>
      </section>
    </div>
  )
}
