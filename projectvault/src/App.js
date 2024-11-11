import './App.css';
import React, { useState, useEffect } from 'react';
import Home from './pages/Home/Home.jsx';
import ProjectList from './pages/ProjectList/ProjectList.jsx';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Project from './pages/Project/Project.jsx';
import AddProject from './pages/AddProject/AddProject.jsx';
import Login from './pages/Login/Login.jsx';
import Contact from './pages/Contact/Contact.jsx';
import About from './pages/About/About.jsx';
import UploadSuccess from './pages/UploadSuccess/UploadSuccess.jsx';
import ProjectDownload from './pages/ProjectDownload/ProjectDownload.jsx';
import Profile from './pages/Profile/Profile.jsx'; 
import PaymentSuccess from './pages/PaymentSuccess/PaymentSuccess.jsx'; 
import PaymentFailure from './pages/PaymentFailure/PaymentFailure.jsx';
import Header from './Components/Header/Header.jsx';
import Footer from './Components/Footer/Footer.jsx';
import Privacy from './pages/Privacy/Privacy.jsx';
import TermsAndCondition from './pages/TermsAndCondition/TermsAndCondition.jsx';
import InvalidScreenSize from './pages/InvalidScreenSize/InvalidScreenSize.jsx';
import EditProject from './pages/EditProject/EditProject.jsx';
import ScrollToTop from './Components/ScrollToTop/ScrollToTop.jsx';


function App() {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const handleResize = () => {
    setScreenWidth(window.innerWidth);
  };
  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
    return (
      <Router>
        <ScrollToTop />
        <Header/>
        <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/project-list" element={<ProjectList />} />
          <Route path="/project" element={<Project />} />
          <Route path="/project-download" element={<ProjectDownload />} />
          <Route path="/addproject" element={<AddProject />} />
          <Route path="/upload-success" element={<UploadSuccess />} />
          <Route path="/success" element={<PaymentSuccess />} />
          <Route path="/failure" element={<PaymentFailure />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms-and-condition" element={<TermsAndCondition />} />
          <Route path="/edit-project" element={<EditProject />} />
        </Routes>
        </div>
        <Footer/>
      </Router>
    );
  // }
}

export default App;
