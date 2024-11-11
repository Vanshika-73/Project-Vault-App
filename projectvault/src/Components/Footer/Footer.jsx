import './Footer.css';
import { useNavigate } from 'react-router-dom';
import { useData } from '../../DataContext';

function Footer() {
  const navigate = useNavigate();
  const { footerFixed } = useData();
  const handleContact = () => {
    navigate('/contact');
  };
  const handleAbout = () => {
    navigate('/about');
  };
  const handlePrivacy = () => {
    navigate('/privacy');
  };
  const handleTermsAndCondition = () => {
    navigate('/terms-and-condition');
  };
  return (
    <>
      <div className={`footer${footerFixed ? '-fixed' : '' }`}>
        <p className='footer-text'>@2024 ProjectVault. All Rights Reserved</p>
        <div className='button-list'>
            <button className='footer-buttons' onClick={handleContact}>contact</button>
            <button className='footer-buttons' onClick={handleAbout}>about</button>
            <button className='footer-buttons' onClick={handlePrivacy}>privacy</button>
            <button className='footer-buttons' onClick={handleTermsAndCondition}>terms & conditions</button>
        </div>
      </div>
    </>
  );
}

export default Footer;