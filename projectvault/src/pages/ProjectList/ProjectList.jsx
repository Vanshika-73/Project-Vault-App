import React, { useState, useEffect, useRef } from 'react';
import './ProjectList.css';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { fetchProjectList } from '../../Service/api';
import { ThreeDots    } from 'react-loader-spinner';
import { useAuth0 } from "@auth0/auth0-react";

function ProjectList() {
  const notFoundImagePath = process.env.PUBLIC_URL + '/images/not-found.jpg';
  const { isAuthenticated, loginWithPopup } = useAuth0();
  const navigate = useNavigate();
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const selectedDomain = queryParams.get('domain');
  const selectedTopic = queryParams.get('topic');
  const [projectList, setProjectList] = useState([]);
  const [loader, setLoader] = useState(true);
  const [maxTags, setMaxTags] = useState(window.innerWidth>600 ? 5 : 2);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  const handleResize = () => {
    setScreenWidth(window.innerWidth);
    handleSetTags();
  };
  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  useEffect(() => {
    handleCallProjectList();
  }, []);
  const handleSetTags = ()=> {
    if(window.innerWidth<=600)
      setMaxTags(2);
    else
      setMaxTags(5);
  };
  const handleCallProjectList = async () => {
    try {
      const response = await fetchProjectList(selectedDomain,selectedTopic);
      const prr=response.projects;
      
      for( var i=0 ; i<prr.length ; i++ )
      {
        const arr = prr[i].rating;
        var c=0;
        for( var j=0 ; j<arr.length ; j++ )
        {
          c=c+arr[j].rate;
        }
        if(arr.length!=0)
        c=c/arr.length;
        prr[i].rate=c;
      }
      setProjectList(prr);

    } catch (error) {}
    setLoader(false);
  };
  const handleProjectClick = (project) => {
    navigate(`/project?projectID=${project._id}`);
  };
  const handleSellButton = () => {
    navigate(`/addproject`);
  };
  const handleLoginButton = () => {
    loginWithPopup();
  };


  return (
    <>
      <div className='heading'>
        <h2>{selectedDomain} Projects</h2>
        <p>{selectedTopic} Topic</p> 
      </div>

      { !loader && projectList.length>0 && projectList.map((project) => (
        <div className='project-box' key={project._id} onClick={() => handleProjectClick(project)}>
        <div className='LHS'>
          <div className='project-title-image'>
            <img src={project.coverphoto} />
            <div className='price-body'>
              <p><strike>{project.price}</strike> <b>Free</b></p>
            </div>
          </div>
          <div className='project-title-text'>
            <h3>{project.title}</h3>
            { screenWidth<=600 && 
              <p>{project.description.length > 100 ? project.description.slice(0, 100)+"..." : project.description}</p>
            }
            { screenWidth>600 && 
              <p>{project.description.length > 250 ? project.description.slice(0, 250)+"..." : project.description}</p>
            }
            <div className='av-docs'>
              {project.documents.map((docs,index) => (
                <div key={docs.value}>
                  { index<maxTags && <div className='doc'><p>{docs.key}</p></div>}
                </div>
              ))}
              { project.documents.length>maxTags && 
                <div>...</div>
              }
            </div>
          </div>
          
        </div>
        <div className='RHS'>
          <div className='star'>&#9733;</div>
          <div className='rating'>
            <p>{project.rate}/5</p>
          </div>
        </div>
      </div>
      ))}
      { loader &&
        <div className='loader-message'>
          <ThreeDots 
            color="#000000"
            height={50}
            width={50}
          />
        </div>
      }
      { !loader && projectList.length==0 &&
        <div className='no-project-message'>
          <img src={notFoundImagePath} />
        </div>
      }
      <div className='body-div3'>
        <h2 className='body-div-headings'>Want to earn from your own projects ?</h2>
        { !isAuthenticated &&
          <button className='sell-button' onClick={handleLoginButton}>Login to Sell</button>
        }
        { isAuthenticated &&
          <button className='sell-button' onClick={handleSellButton}>Sell your Project</button>
        }
      </div>
    </>
  );
}

export default ProjectList;