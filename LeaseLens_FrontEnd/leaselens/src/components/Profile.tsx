import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { UserdbProps } from "../types/logintypes";
import axios from "axios";

const BACKHOST = process.env.REACT_APP_BACK_HOST;

export default function Profile({ user_name, user_ID, user_points }: UserdbProps) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const userDel = () => {
    axios
      .delete(`${BACKHOST}/users/quit`)
      .then((response) => {
        console.log(response.data);
        alert("성공적으로 탈퇴되었습니다.");
        window.location.pathname = "/main";
      })
      .catch((error) => {
        console.error("Error Deleting User:", error);
      });
  };

  return (
    <div className="profile_container">
      <h3>{user_name}님의 회원 정보</h3>
      <div className="profile_content">
        <div className="profile_user">
          <h4>{user_name}님</h4>
          <div>아이디 : {user_ID}</div>
        </div>
        <div className="profile_point">
          <h4>{user_ID}님의 잔여 포인트</h4>
          <div>{user_points}point</div>
        </div>
      </div>
      <Button variant="outline-danger" className="profile_userDel" onClick={handleShow}>
        회원 탈퇴
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>회원 탈퇴</Modal.Title>
        </Modal.Header>
        <Modal.Body>정말 탈퇴 하시겠습니까?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            취소
          </Button>
          <Button variant="danger" onClick={userDel}>
            탈퇴
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
