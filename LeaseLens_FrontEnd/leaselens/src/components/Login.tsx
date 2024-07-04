import React, { useEffect, useState } from 'react';
import { BsXLg } from "react-icons/bs";
import type { LoginProps } from "../types/types";
import axios from 'axios';

const BACKHOST = process.env.REACT_APP_BACK_HOST;

axios.defaults.withCredentials = true;

export default function Login({ onClose }: LoginProps) {
  const currentLocation = window.location.pathname;
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    id: '',
    password: '',
    confirmPassword: ''
  });
  const [isPasswordMatch, setIsPasswordMatch] = useState(true);

  const toggleForm = () => {
    setIsLoginForm(!isLoginForm);
    setFormData({
      name: '',
      id: '',
      password: '',
      confirmPassword: ''
    });
  };

  useEffect(() => {
    if (formData.password && formData.confirmPassword) {
      setIsPasswordMatch(formData.password === formData.confirmPassword);
    }
  }, [formData.password, formData.confirmPassword]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${BACKHOST}/users/login`, {
        user_ID: formData.id,
        user_pw: formData.password
      });
      alert(response.data.message);
      window.location.replace(currentLocation);
      if (onClose) {
        onClose();
      }
      setFormData({
        name: '',
        id: '',
        password: '',
        confirmPassword: ''
      });
      console.log(response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        alert('로그인 실패: ' + error.response?.data.message);
        setFormData({
          name: '',
          id: '',
          password: '',
          confirmPassword: ''
        });
      } else {
        alert('로그인 실패: 알 수 없는 오류가 발생했습니다.');
        setFormData({
          name: '',
          id: '',
          password: '',
          confirmPassword: ''
        });
      }
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }
    try {
      const response = await axios.post(`${BACKHOST}/users/register`, {
        user_name: formData.name,
        user_ID: formData.id,
        user_pw: formData.password,
        confirm_pw: formData.confirmPassword
      });
      alert(response.data.message);
      setIsLoginForm(true);
      setFormData({
        name: '',
        id: '',
        password: '',
        confirmPassword: ''
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        alert('회원가입 실패: ' + error.response?.data.message);
        setFormData({
          name: '',
          id: '',
          password: '',
          confirmPassword: ''
        });
      } else {
        alert('회원가입 실패: 알 수 없는 오류가 발생했습니다.');
        setFormData({
          name: '',
          id: '',
          password: '',
          confirmPassword: ''
        });
      }
    }
  };

  return (
    <div className='login_form_back'>
      {isLoginForm ? (
        <form action="" method="post" id="login_form" onSubmit={handleLogin}>
          <BsXLg style={{ position: 'absolute', right: 20, top: 50, width: 25, height: 25 }} onClick={onClose} />
          <div id="login_body">
            <div id="login_welcome">
              <div id="login_welcome-1">Lease Lens</div>
              <div id="login_welcome-2">Welcome to Lease Lens</div>
            </div>
            <div id="login_input">
              <div className="login_input_item">
                <input placeholder="id" type="text" name="id" value={formData.id} onChange={handleInputChange} />
              </div>
              <div className="login_input_item">
                <input placeholder="Password" type="password" name="password" value={formData.password} onChange={handleInputChange} />
              </div>
            </div>
            <div id="login_submit">
              <button id="login_submitBtn" type="submit">Login</button>
            </div>
            <div id="login_to_signup">
              <a href="#" onClick={(e) => { e.preventDefault(); toggleForm(); }}>Sign up</a>
            </div>
          </div>
        </form>
      ) : (
        <form action="" method="post" id="signup_form" onSubmit={handleSignup}>
          <BsXLg style={{ position: 'absolute', right: 20, top: 50, width: 25, height: 25 }} onClick={onClose} />
          <div id="signup_body">
            <div id="login_welcome">
              <div id="login_welcome-1">Lease Lens</div>
              <div id="login_welcome-2">Welcome to Lease Lens</div>
            </div>
            <div id="login_input">
              <div className="login_input_item">
                <input placeholder="name" type="text" name="name" value={formData.name} onChange={handleInputChange} />
              </div>
              <div className="login_input_item">
                <input placeholder="id" type="text" name="id" value={formData.id} onChange={handleInputChange} />
              </div>
              <div className="login_input_item">
                <input placeholder="Password" type="password" name="password" value={formData.password} onChange={handleInputChange} />
              </div>
              <div className="login_input_item" style={{ border: isPasswordMatch ? '1px solid #005477' : '1px solid red' }}>
                <input placeholder="Check Password" type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleInputChange} />
              </div>
            </div>
            <div id="login_submit">
              <button id="login_submitBtn" type="submit">Sign Up</button>
            </div>
            <div id="login_to_signup">
              <a href="#" onClick={(e) => { e.preventDefault(); toggleForm(); }}>Login</a>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}