import { Link } from "react-router-dom";
import Banner from "../components/Banner";
import Footer from "../components/Footer";
import GreenBtn from "../components/GreenBtn";
import Header from "../components/Header";
import PostTable from "../components/PostTable";
import Search from "../components/Search";
import { useEffect, useState } from "react";
import axios from "axios";
import { RevdbProps } from "../types/reviewtypes";

const BACKHOST = process.env.REACT_APP_BACK_HOST;

export default function ReviewListPage() {
  const [reviewArr, setReviews] = useState<RevdbProps[]>([]);
  const [filteredReviews, setFilteredReviews] = useState<RevdbProps[]>([]);
  const [isAdmin, setAdmin] = useState(Boolean);

  useEffect(() => {
    async function getAdmin() {
      const adminRes = await axios.get(`${BACKHOST}/auth/adminCheck`);
      setAdmin(adminRes.data.data.isAdmin);
    }
    getAdmin();
  }, [reviewArr]);

  useEffect(() => {
    async function fetchReviews() {
      if(isAdmin === false) {
        try {
          const response = await axios.get(`${BACKHOST}/reviews`);
          setReviews(response.data.data.reviews);
        } catch (err) {
          console.log(err)
        }
      }
      else {
        try {
          const response = await axios.get(`${BACKHOST}/admin`);
          setReviews(response.data.data);
        } catch (err) {
          console.log(err)
        }
      }
    }

    fetchReviews();
  }, [isAdmin]);

  const SearchValue = (value: string) => {
    const filtered = reviewArr.filter(review => 
      review.rev_title?.toLowerCase().includes(value.toLowerCase())
    );
    if (filtered.length === 0) {
      setFilteredReviews([{
        rev_title: '검색 결과가 없습니다'
      }]);
    } else {
      setFilteredReviews(filtered);
    }
  }

  return (
    <>
      <Header />
      <main className="revPage">
        <section className="revPage_main">
          <div className="revPage_banner">
            <Banner bannerTxt={"리뷰 커뮤니티"} />
          </div>
          <div className="revPage_table">
            <div className="revPage_table_header">
              <div>
                <Search searchOpt={"검색할 제목을 입력하세요."} search={SearchValue} />
              </div>
              <div>
                <Link to={'/reviews'}>
                  <GreenBtn greenBtn_txt="글쓰기" />
                </Link>
              </div>
            </div>
            <PostTable fontSize="32px" thTxt="인증"
              reviewArr={reviewArr}
              filteredRevArr = {filteredReviews}
              thBtn={
                <input
                  type="checkbox"
                  checked
                  readOnly
                  className="postTable_body_input"
                />
              }
            />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
