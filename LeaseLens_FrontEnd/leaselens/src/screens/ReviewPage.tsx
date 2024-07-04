import Header from '../components/Header'
import RevCard from '../components/RevCard'
import Comment from '../components/Comment'
import Footer from '../components/Footer'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { RevdbProps } from '../types/reviewtypes';

const BACKHOST = process.env.REACT_APP_BACK_HOST;

export default function ReviewPage() {
  const revIndex = window.location.pathname.split('/')[2];
  const [review, setReview] = useState<RevdbProps>(Object);
  const [isAdmin, setAdmin] = useState<Boolean | null>(null);

  useEffect(() => {
    async function getAdmin() {
      try {
        const admin = await axios.get(`${BACKHOST}/auth/adminCheck`);
        setAdmin(admin.data.data.isAdmin);
      } catch (err) {
        console.log(err);
      }
    }

    getAdmin();
  }, []);

  useEffect(() => {
    async function fetchReviews() {
      if (isAdmin === null) {
        // isAdmin 상태가 설정되지 않았을 때는 아무것도 하지 않음
        return;
      }

      try {
        let response;
        if (isAdmin) {
          response = await axios.get(`${BACKHOST}/admin/${revIndex}`);
          setReview(response.data.data);
        } else {
          response = await axios.get(`${BACKHOST}/reviews/${revIndex}`);
          setReview(response.data.data.review);
        }
      } catch (err) {
        console.log(err);
      }
    }

    fetchReviews();
  }, [revIndex, isAdmin]);

  return (
    <>
      <Header />
      <div className='reviewPage_Info'>
        <span className='reviewPage_proname'>{review.Product?.prod_name}</span>
        <span className='reviewPage_Id'>작성자 : {review.User?.user_ID}</span>
      </div>
      <main className="reviewPage_main">
        <div className="reviewPage_revCard">
          <RevCard width="90%" height="100%" review={review}/>
        </div>
        <div className="reviewPage_commentBox">
          <Comment isAdmin={isAdmin} rev_idx={review.rev_idx} rev_authImg={review.rev_authImg}/>
        </div>
      </main>
      <Footer />
    </>
  );
}
