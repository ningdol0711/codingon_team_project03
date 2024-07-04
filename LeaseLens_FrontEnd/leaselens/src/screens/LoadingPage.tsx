import logoImg from '../assets/images/Logo/leaselens_imgsm_logo.png'
import logoText from '../assets/images/Logo/leaselens_text_logo.png'
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export default function LoadingPage() {

  const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate('/main');
        }, 2000);

        return () => clearTimeout(timer);
    }, [navigate]);

  return (
    <main className='LodingPage_main'>
      <section className="LodingPage_logo_box">
        <div className="LodingPage_logoImg_box">
          <img src={logoImg} alt="" className="LodingPage_logoImg" />
        </div>
        <div className="LodingPage_logoText_box">
          <img src={logoText} alt="" className="LodingPage_logoText" />
        </div>
      </section>
    </main>
  )
}
