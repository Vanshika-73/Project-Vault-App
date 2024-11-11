import './UploadSuccess.css';
import { useAuth0 } from "@auth0/auth0-react";
import { fetchAllProjectsOfUser, fetchProjectfromDB } from '../../Service/api';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function UploadSuccess() {
  const imagePath = process.env.PUBLIC_URL + '/images/coverImage.png';
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth0();
  const [project, setProject] = useState(null);
  const [flag, setFlag] = useState(true);
  // useEffect(()=>{
  //   if( ( !project || project==null) && isAuthenticated )
  //     fetchData();
  // },[]);

  // const fetchData = async () => {
  //   const response = await fetchAllProjectsOfUser(user.email);
  //   try {
  //     const projectIDs=response.projects.documents;
  //     const ID = projectIDs[projectIDs.length-1];
  //     const projectResponse = await fetchProjectfromDB(ID);
  //     setProject(projectResponse.project);
  //   } catch (error) {}      
  // };

  const handleNewProjectPage = () => {
    navigate(`/addproject`);
  };
  const handleHomePage = () => {
    navigate(`/`);
  };
  return (
    <>
      <div className='success-outer-div'>
        <div className='success-message-div'>
          <h1 className='success-message'>Your project has been successfully uploaded !</h1>
        </div>
        <div className='success-project-div'>
          <div className='project-reload'>
            <button className='load-button' onClick={handleNewProjectPage} > Upload New Project  </button>
            <button className='load-button' onClick={handleHomePage} > Home Page </button>
          </div>
        </div>
        {/* <div className='success-project-div'>
          { project && 
            <div className='success-project' onClick={handleProjectClick}>
              <div className='success-project-LHS'>
                { project.coverphoto 
                  ? <img src={project.coverphoto} />
                  : <img src={imagePath} />
                }
              </div>
              <div className='success-project-RHS'>
                <p className='project-title'>{project.title}</p>
                <p className='project-desc'>
                  {project.description.length > 90 ? project.description.slice(0, 90)+"..." : project.description}
                </p>
                <p className='project-price'>₹{project.price}</p>
                <div className='project-docs'>
                  {project.documents.map((docs,index) => (
                    <div key={index}>
                      { index<2 && <div className='project-doc'><p>{docs.key}</p></div>}
                      { index==2 && <div className='project-doc'><p>...</p></div>}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          }
          { !project &&
            <div className='project-reload'>
              <p>Cannot load project at the moment</p>
              <button className='load-button' onClick={fetchData} > Reload </button>
            </div>
          }
        </div> */}
      </div>
    </>
  );
}

export default UploadSuccess;
