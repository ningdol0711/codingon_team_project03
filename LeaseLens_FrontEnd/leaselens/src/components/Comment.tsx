import { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import "../assets/scss/LJG.scss";
import { CommentdbProps } from "../types/commenttypes";
import axios from "axios";

const BACKHOST = process.env.REACT_APP_BACK_HOST;

export default function Comment({ isAdmin, rev_authImg }: CommentdbProps) {
  const [isOptBoxVisible, setIsOptBoxVisible] = useState<number | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<string>("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [commentToDelete, setCommentToDelete] = useState<number | null>(null);

  const priviousLocation = document.referrer;

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const response = await axios.get(`${BACKHOST}/auth/check`);
        if (response.data.data.isAuthenticated) {
          setIsLoggedIn(true);
          setCurrentUser(response.data.data.currentUserId.user_ID);
        }
      } catch (error) {
        console.error("로그인 상태 확인 실패:", error);
      }
    };
    checkLoginStatus();
  }, [isLoggedIn]);

  const toggleOptBox = (commentIdx: number) => {
    if (isLoggedIn === true) {
      setIsOptBoxVisible((prevState) =>
        prevState === commentIdx ? null : commentIdx
      );
    } else {
      alert("로그인 후 이용해주세요");
    }
  };

  const revIndex = window.location.pathname;
  const [RevComments, setRevComments] = useState<CommentdbProps[]>([]);

  const showComments = async () => {
    try {
      const response = await axios.get(`${BACKHOST}${revIndex}`);
      setRevComments(response.data.data.review.Comments);
    } catch (err) {
      console.log(err);
    }
  };

  const [commentText, setCommentText] = useState("");

  const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCommentText(e.target.value);
  };

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(`${BACKHOST}${revIndex}/comments`, {
        com_text: commentText,
      });
      setCommentText("");
      showComments();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    showComments();
  }, []);

  const [editingCommentIdx, setEditingCommentIdx] = useState<number | null>(
    null
  );
  const [editedCommentText, setEditedCommentText] = useState("");

  const handleEditedCommentChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setEditedCommentText(e.target.value);
  };

  const handleEditComment = (
    commentIdx: number,
    currentText: string,
    user_ID: string | undefined
  ) => {
    if (user_ID === currentUser) {
      setEditingCommentIdx(commentIdx);
      setEditedCommentText(currentText);
    } else {
      alert("자신의 댓글만 수정할 수 있습니다.");
    }
  };

  const handleSaveEditedComment = async (com_idx: number) => {
    try {
      await axios.patch(
        `${BACKHOST}${revIndex}/comments/${com_idx}`,
        {
          com_text: editedCommentText,
        }
      );
      setEditingCommentIdx(null);
      showComments();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (editingCommentIdx !== null) {
      setIsOptBoxVisible(null);
    }
  }, [editingCommentIdx]);

  function handleReviewAuth() {
    const rev_idx = revIndex.split("/")[2];
    axios
      .post(`${BACKHOST}/admin/${rev_idx}/auth`)
      .then((response) => {
        alert(response.data.message);
        window.location.replace(priviousLocation);
      });
  }

  const handleDeleteConfirmation = (com_idx: number) => {
    setCommentToDelete(com_idx);
    setShowDeleteModal(true);
  };

  const handleDeleteComment = async () => {
    if (commentToDelete !== null) {
      try {
        await axios.delete(
          `${BACKHOST}${revIndex}/comments/${commentToDelete}`
        );
        setShowDeleteModal(false);
        showComments();
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div className="comment">
      <section className="comment_titleArea">
        {isAdmin ? "" : <p className="comment_title">Comments</p>}
      </section>
      <div className="comment_scrollArea">
        {isAdmin ? (
          <img src={rev_authImg} className="rev_authImg"></img>
        ) : (
          RevComments.map((comment) => (
            <section className="comment_bodyArea">
              <div className="comment_body" key={comment.com_idx}>
                <section className="comment_commentInfo">
                  <div className="comment_userId">{comment.User?.user_ID}</div>
                  <div className="comment_date_opt">
                    <p className="comment_date">
                      {comment.createdAt?.split("T")[0]}
                    </p>
                    <button
                      className="comment_opt_btn"
                      onClick={() => toggleOptBox(comment.com_idx!)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="23"
                        height="23"
                        fill="currentColor"
                        className="bi bi-three-dots"
                        viewBox="0 0 16 16"
                      >
                        <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3" />
                      </svg>
                    </button>
                    {isOptBoxVisible === comment.com_idx! && (
                      <div className="comment_opt_box">
                        <div className="comment_opt_edit comment_opt">
                          <p
                            onClick={() =>
                              handleEditComment(
                                comment.com_idx!,
                                comment.com_text!,
                                comment.User?.user_ID
                              )
                            }
                          >
                            수정
                          </p>
                        </div>
                        <div className="comment_opt_del comment_opt">
                          <p
                            onClick={() =>
                              handleDeleteConfirmation(comment.com_idx!)
                            }
                          >
                            삭제
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </section>
                <section className="comment_comment">
                  {editingCommentIdx === comment.com_idx ? (
                    <>
                      <input
                        type="text"
                        value={editedCommentText}
                        onChange={handleEditedCommentChange}
                      />
                      <button
                        style={{
                          backgroundColor: "black",
                          borderRadius: "5px",
                          color: "white",
                        }}
                        onClick={() =>
                          handleSaveEditedComment(comment.com_idx!)
                        }
                      >
                        수정
                      </button>
                    </>
                  ) : (
                    <p className="comment_content">{comment.com_text}</p>
                  )}
                </section>
              </div>
            </section>
          ))
        )}
      </div>
      <section className="comment_inputArea">
        <div className="comment_inputBox">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            fill="currentColor"
            className="bi bi-arrow-right"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"
            />
          </svg>
          <input
            type="text"
            className="comment_input"
            value={commentText}
            onChange={handleCommentChange}
          />
          {isAdmin ? (
            <button className="comment_sendBtn" onClick={handleReviewAuth}>
              인증
            </button>
          ) : (
            <button className="comment_sendBtn" onClick={handleCommentSubmit}>
              작성
            </button>
          )}
        </div>
      </section>

      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>댓글 삭제</Modal.Title>
        </Modal.Header>
        <Modal.Body>정말 삭제하시겠습니까?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            취소
          </Button>
          <Button variant="danger" onClick={handleDeleteComment}>
            삭제
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
