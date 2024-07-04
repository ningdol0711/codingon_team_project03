import { useEffect, useState } from "react";
import Header from "../components/Header";
import SideBar from "../components/SideBar";
import Banner from "../components/Banner";
import ProCard from "../components/ProCard";
import Search from "../components/Search";
import MobileSideBar from "../components/MobileSideBar";
import Footer from "../components/Footer";
import axios from "axios";
import { ProProps } from "../types/types";

const BACKHOST = process.env.REACT_APP_BACK_HOST;

export default function ProductPage() {
  const [allProducts, setAllProducts] = useState<ProProps[]>([]);
  const [products, setProducts] = useState<ProProps[]>([]);
  const [categorySelect, setCategory] = useState<String>("");
  const [bannertxt, setBannerTxt] = useState<string>("");

  const Prods = (category: String) => {
    if(category === "") {
      setBannerTxt("전체 상품")
      setProducts(allProducts);
    }
    setCategory(category);
  };

  useEffect(() => {
    axios
      .get(`${BACKHOST}/products${categorySelect}`)
      .then((response) => {
        setAllProducts(response.data.data.products);
        setProducts(response.data.data.products);
      })
      .catch((error) => {
        console.error("제품을 가져오는 중 오류가 발생했습니다:", error);
      });
  }, [categorySelect]);

  const Search1 = (val: string) => {
    if (val === "") {
      setBannerTxt("전체 상품");
      setProducts(allProducts);
    } else {
      setBannerTxt(val.toUpperCase());
      setProducts(allProducts.filter((e) => e?.prod_name?.toLowerCase().includes(val.toLowerCase())));
    }
  }
  
  useEffect(() => {
    const Text = categorySelect.split("=");
    setBannerTxt(Text[1] || "전체 상품");
  }, [categorySelect]);
  
  return (
    <>
      <Header />
      <div className="propg_main_container">
        <div className="propg_side_container">
          <Search searchOpt={"제품명을 입력해주세요."} search={Search1} />
          <SideBar getProds={Prods} />
          <MobileSideBar getProds={Prods} />
        </div>
        <div className="propg_sec_container">
          <Banner bannerTxt={bannertxt} />
          <div className="propg_product_container">
            {products.map((product) => {
              return <ProCard key={product.prod_idx} product={product} />;
            })}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
