import { Link } from "react-router-dom";
import type { PostTableProps } from "../types/types";
import { Button } from 'react-bootstrap';
import axios from "axios";

const BACKHOST = process.env.REACT_APP_BACK_HOST;

export default function PostTable({
  fontSize,
  thTxt,
  reviewArr,
  filteredRevArr = [],
}: PostTableProps) {

  function deleteReview(rev_idx: number | undefined) {
    if(rev_idx !== undefined) {
      axios.delete(`${BACKHOST}/reviews/${rev_idx}`);
      alert("정상적으로 삭제 되었습니다.");
      window.location.reload();
    }
    else {
      alert("존재하지 않는 리뷰 입니다.");
    }
  }

  const selectedReviewArr = filteredRevArr.length > 0 ? filteredRevArr : reviewArr;
  
  return (
    <div className="postTable">
      <table className="postTable_table">
        <thead className="postTable_thead">
          <tr className="postTable_head_tr" style={{ fontSize }}>
            <th className="postTable_head_th">번호</th>
            <th className="postTable_head_th">작성일</th>
            <th className="postTable_head_th">제품명</th>
            <th className="postTable_head_th">제목</th>
            <th className="postTable_head_th">작성자</th>
            <th className="postTable_head_th">{thTxt}</th>
          </tr>
        </thead>
        <tbody className="postTable_tbody">
          {selectedReviewArr &&
            selectedReviewArr.map((review, idx) => {
              return (
                <tr className="postTable_body_tr" style={{ fontSize }}>
                  <th className="postTable_body_th">{idx+1}</th>
                  <th className="postTable_body_th">
                    {review.rev_createdAt?.split("T")[0]}
                  </th>
                  <th className="postTable_body_th">
                    {review.Product?.prod_name}
                  </th>
                  <th className="postTable_body_th">
                    <Link to={`/reviews/${review.rev_idx}`}>
                      {review.rev_title}
                    </Link>
                  </th>
                  <th className="postTable_body_th">{review.User?.user_ID}</th>
                  <th className="postTable_body_th">
                    {window.location.pathname === "/mypage" ? (
                      <Button variant="outline-danger" className="postDel" onClick={() => {deleteReview(review.rev_idx)}}>삭제</Button>
                    ) : (
                      <input
                        type="checkbox"
                        checked={review.rev_isAuth}
                        readOnly
                        className="postTable_body_input"
                      />
                    )}
                  </th>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}
