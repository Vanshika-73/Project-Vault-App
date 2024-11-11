import './ProjectDownload.css';
import { useLocation } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";
import React, { useState } from 'react';
import { checkProjectDownloadEligibilty } from '../../Service/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import { fetchProjectfromDB } from '../../Service/api';
import { ThreeDots    } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';

function ProjectDownload() {
  const notFoundImagePath = process.env.PUBLIC_URL + '/images/not-found.jpg';
  const { isAuthenticated, user, loginWithPopup } = useAuth0();
  const { search } = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(search);
  const projectID = queryParams.get('projectID');
  const [eligible, setEligible] = useState(null);
  const [projectLink, setProjectLink] = useState(true);
  const [project, setProject] = useState(null); 
  const [loading, setLoading] = useState(true);


  React.useEffect( () => {
    fetchProject();
    if (!isAuthenticated) 
    {
      setEligible(false);
    }
    else
    {
      initiateCheck();
    }
  }, []);
  const fetchProject = async () => {
    try {
      const response = await fetchProjectfromDB(projectID);
      setProject(response.project);
      setProjectLink(response.project.projectlink);
    } catch (error) {}
    setLoading(false);
  };
  const initiateCheck = async () => {
    try {
      const response = await checkProjectDownloadEligibilty(user.email,projectID);
      setEligible(response.eligible);
    } catch (error) {}
  };
  const followLink = async (link) => {
    window.open(link);
  };
  const handleSellButton = () => {
    navigate(`/addproject`);
  };
  const handleLoginButton = () => {
    loginWithPopup();
  };


  // if(eligible)
  if(true)
  {
    if(project==null)
    {
      return (
        <>
          { (loading || project==null) && 
            <div className='no-project'>
            { !loading && project==null && 
              <img src={notFoundImagePath} />
            }
            { loading &&
              <ThreeDots 
                color="#000000"
                height={50}
                width={50}
              />
            }
          </div>
          }
        </>
      );
    }
    else
    {
      return (
        <>
          <h1 className='project-heading'>Download your project</h1>
          
          { projectLink && 
            <div>
              <h4 className='project-download-subheading'>Source Code</h4>
              <div className='projectlink'>
                <div className='projectlink-message'>
                  <p>Project Link</p>
                </div>
                <div className='projectlink-button' onClick={() => followLink(project.projectlink)}>
                  <FontAwesomeIcon icon={faPaperPlane} />
                </div>
              </div>
            </div>
          }
          <h4 className='project-download-subheading'>Documents</h4>
          { project && project.documents && project.documents.map((document, index) => (
            <div className='projectlink'> 
              <div key={index} className='projectlink-message'>
                <p>{document.key}</p>
              </div>
              <div className='projectlink-button' onClick={() => followLink(document.value)}>
                <FontAwesomeIcon icon={faDownload} />
              </div>
            </div>
          ))}
          {project && ((projectLink && project.documents.length<2) || (!projectLink && project.documents.length<=3)) &&
            <div className='download-list-spacer'><p> </p></div>
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
  }
  else if(eligible==null)
  {
    return (
      <>
        <h1>Loading...</h1>
      </>
    );
  }
  else
  {
    return (
      <>
        <h1>You're Not Eligible !!</h1>
      </>
    );
  }
}

export default ProjectDownload;
