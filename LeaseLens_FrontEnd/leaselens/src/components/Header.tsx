import { useEffect, useState } from 'react'
import { BsList } from "react-icons/bs";
import textLogo from '../assets/images/Logo/leaselens_text_logo.png'
import imgLogo from '../assets/images/Logo/leaselens_img_logo.png'
import profile from '../assets/images/etc/icon_profile.png'
import Login from './Login';
import { Link } from 'react-router-dom';
import axios from 'axios';

const BACKHOST = process.env.REACT_APP_BACK_HOST;

axios.defaults.withCredentials = true;

export default function Header() {
    const currentLocation = window.location.pathname;
    const [profileTog, setProfileTog] = useState(false);
    const [menuTog, setMenuTog] = useState(false);
    const [showLogin, setShowLogin] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const checkLoginStatus = async () => {
            try {
                const response = await axios.get(`${BACKHOST}/auth/check`);
                if (response.data.data.isAuthenticated) {
                    setIsLoggedIn(true);
                }
            } catch (error) {
                console.error('로그인 상태 확인 실패:', error);
            }
        };
        checkLoginStatus();
    }, [isLoggedIn]);

    const profileBtn = () => {
        setProfileTog(!profileTog)
    }

    const menuBtn = () => {
        setMenuTog(!menuTog)
    }

    const handleLoginClick = () => {
        setShowLogin(true);
    };

    const handleCloseLogin = () => {
        setShowLogin(false);
    };

    const ContactClick = () => {
        alert('준비 중 입니다.');
    };

    const handleLogoutClick = async () => {
        try {
            const response = await axios.get(`${BACKHOST}/users/logout`);
            alert(response.data.message)
            window.location.replace(currentLocation);
        } catch (error) {
            console.error('로그아웃 실패:', error);
            alert('로그아웃에 실패했습니다.');
        }
    };

    return (
        <>
            <div className='head_container'>
                <div className="head_logo">
                    <Link to="/main">
                        <img src={textLogo} alt="리스렌즈 로고" />
                    </Link>
                </div>
                <div className="head_nav">
                    <ul>
                        <Link to="/products"><li>Products</li></Link>
                        <Link to="/reviewlist"><li>Reviews</li></Link>
                        <Link to="/events"><li>Events</li></Link>
                    </ul>
                </div>
                <div className="head_nav_min">
                    <BsList style={{ height: '3em', width: '3em' }} onClick={menuBtn} />
                </div>
                <div className="head_logo_min">
                    <Link to="/main" className='link'>
                        <img src={imgLogo} alt="리스렌즈 로고" />
                    </Link>
                </div>
                <div className="head_loginUser">
                    {isLoggedIn ? (
                        <img src={profile} alt="프로필 아이콘" className='head_profile' onClick={profileBtn} />
                    ) : (
                        <span onClick={handleLoginClick}>Login</span>
                    )}
                </div>
            </div>
            {menuTog ?
                <div className='head_navTog'>
                    <ul>
                        <Link to="/products"><li>Products</li></Link>
                        <hr />
                        <Link to="/reviewlist"><li>Reviews</li></Link>
                        <hr />
                        <Link to="/events"><li>Events</li></Link>
                    </ul>
                </div>
                : ''
            }
            {profileTog ?
                <div className='head_profileTog'>
                    <ul>
                        <Link to="/mypage"><li>My Page</li></Link>
                        <hr />
                        <a href="#"><li onClick={ContactClick}>Contact Us</li>
                            <hr /></a>
                        <li onClick={handleLogoutClick}>Logout</li>
                    </ul>
                </div>
                : ''
            }
            {showLogin && <Login onClose={handleCloseLogin} />}
        </>
    )
}
