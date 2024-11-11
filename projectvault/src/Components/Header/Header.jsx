import React, { useState } from 'react';import './Header.css';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";
import { useData } from '../../DataContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Modal from 'react-modal';
import { faBars, faDoorOpen, faHome, faMultiply, faNoteSticky, faPhone, faPlus, faUser } from '@fortawesome/free-solid-svg-icons';


function Header() {
  const imagePath = process.env.PUBLIC_URL + '/images/logo-t.png';
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth0();
  const { setLastVisitedPage } = useData();
  const [menuOpen, setMenuOpen] = useState(false);
  
  const customStyles = {
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0)', // Make overlay transparent
    },
  };
  const handleLogoClick = () => {
    navigate(`/`);
  }
  const handleManuIconClick = () => {
    setMenuOpen(!menuOpen);
  };
  const handleMenuButtonClick = (page) => {
    setMenuOpen(false);
    navigate(`/${page}`);
  };
  const handleCallLoginPage = () => {
    setLastVisitedPage(window.location.pathname + window.location.search);
    navigate(`/login`, {replace: true});
  };
  const handleLogOut = () => {
    setMenuOpen(false);
    logout();
  };
  return (
    <>
      <header className='header'>
        <div className='header-nav'></div> {/* extra <div> just to center the logo */}
        <div className='header-logo' onClick={handleLogoClick}>
          <img src={imagePath} />
        </div> 
        <div className='header-nav'>
            <div className='menu-div' onClick={handleManuIconClick} >
              { !menuOpen &&
                <FontAwesomeIcon className='icon' icon={faBars} />}
              { menuOpen &&
                <FontAwesomeIcon className='icon' icon={faMultiply} />}
            </div> 
        </div>
        <Modal
            className='menu-modal'
            isOpen={menuOpen}
            onRequestClose={handleManuIconClick}
            overlayClassName="menu-overlay"
            style={customStyles}
          >
          { !isAuthenticated &&
            <div className='menu-outer'>
              <div className='menu-close-button'>
                <FontAwesomeIcon className='icon' icon={faMultiply} onClick={handleManuIconClick} />
              </div>
              <div className='menu-box' onClick={()=>handleMenuButtonClick("login")}>
                <FontAwesomeIcon className='menu-box-icon' icon={faUser} />
                <h3 className='menu-box-text'>Login</h3>
              </div>
            </div>
          }
          {isAuthenticated &&
            <div className='menu-outer'>
            <div className='menu-close-button'>
              <FontAwesomeIcon className='icon' icon={faMultiply} onClick={handleManuIconClick} />
            </div>
            <div className='menu-box' onClick={()=>handleMenuButtonClick("")}>
              <FontAwesomeIcon className='menu-box-icon' icon={faHome} />
              <h3 className='menu-box-text'>Home</h3>
            </div>
            <div className='menu-box' onClick={()=>handleMenuButtonClick("profile")}>
              <FontAwesomeIcon className='menu-box-icon' icon={faUser} />
              <h3 className='menu-box-text'>Profile</h3>
            </div>
            <div className='menu-box' onClick={()=>handleMenuButtonClick("addproject")}>
              <FontAwesomeIcon className='menu-box-icon' icon={faPlus} />
              <h3 className='menu-box-text'>Upload New Project</h3>
            </div>
            <div className='menu-box' onClick={()=>handleMenuButtonClick("about")}>
              <FontAwesomeIcon className='menu-box-icon' icon={faNoteSticky} />
              <h3 className='menu-box-text'>About Us</h3>
            </div>
            <div className='menu-box' onClick={()=>handleMenuButtonClick("contact")}>
              <FontAwesomeIcon className='menu-box-icon' icon={faPhone} />
              <h3 className='menu-box-text'>Contact Us</h3>
            </div>
            <div className='menu-box' onClick={handleLogOut}>
              <FontAwesomeIcon className='menu-box-icon' icon={faDoorOpen} />
              <h3 className='menu-box-text'>Log out</h3>
            </div>
          </div>}
        </Modal>
      </header>
      
    </>
    
  );
}

export default Header;
