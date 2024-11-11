import React, { useState, useEffect } from 'react';
import './Profile.css';
import '../../Components/Spinner/Spinner.css';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";  
import { userAccountDelete, fetchProjectfromDB, moveProjectToDeleted, projectDelete, fetchAllProjectsOfUser } from '../../Service/api';
import Modal from 'react-modal';
import { ThreeDots    } from 'react-loader-spinner';
import { useData } from '../../DataContext';

function Profile() { 
  const { logout, isAuthenticated, user, isLoading } = useAuth0();
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [projects, setProjects] = useState(null);
  const [yourProjects, setYourProjects] = useState(null);
  const [emptyList, setEmptyList] = useState(['L','O','A','D','I','N','G']);
  const imagePath = process.env.PUBLIC_URL + '/images/coverImage.png';
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loadCount, setLoadCount] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [projectLoader, setProjectLoader] = useState(true);
  const { setLastVisitedPage } = useData();



  React.useEffect( () => {
    if ( isAuthenticated && projects==null && user?.email!=null) 
    {
      fetchProjectList(user.email);
    }
  }, []);
  React.useEffect( () => {
    if( !isAuthenticated && !isLoading )
    {
      setLastVisitedPage(window.location.pathname + window.location.search);
      navigate(`/login`, {replace: true});
    }
  }, [isLoading]);
  const fetchProjectList = async (email) => {
    try {
      const ProjectsResponse = await fetchAllProjectsOfUser(email);
      setUserData(ProjectsResponse.projects);
      setProjects(ProjectsResponse.projects.documents);
      setTotalCount(ProjectsResponse.projects.documents.length);
      if( ProjectsResponse.projects.documents.length == 0 )
      {
        setYourProjects([]);
      }
      var xr=[];
      for (let i = 0; i < ProjectsResponse.projects.documents.length; i++) {
        xr.push(ProjectsResponse.projects.documents[i]);
        if(i%3==0 || i == ProjectsResponse.projects.documents.length-1)
        {
          await fetchProjectDatafromProjects(xr);
        }
        setLoadCount(i+1);
      }
      // fetchProjectDatafromProjects(ProjectsResponse.projects.documents);
    } catch (error) {
      setYourProjects([]);
      // setLoa 
    }
  };
  const fetchProjectDatafromProjects = async (projects2) => {
    try {
      var ar = [];
      for (let i = 0; i < projects2.length; i++) {
        try {
          const res = await fetchProjectfromDB(projects2[i]);
          ar.push(res.project);
        } catch (e) {
          console.error('Error fetching project:', e);
        }
      }
      setYourProjects(ar);
    } catch (error) {
      alert("An error occured");
    }
    
  };
  const handleProjectOpen = (pid) => {
    navigate(`/project?projectID=${pid}`);
  };
  const handleLogOut = () => {
    navigate('/', { replace: true });
    logout();
  };
  const handleAccountDeleteModal = () => {
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const handleProjectsDelete = async () => {
    try {
      console.log("PROJECTS");
      for( var i=0 ; i<yourProjects.length ; i++ )
      {
        await projectDelete({ID : yourProjects[i]._id});
        await moveProjectToDeleted({id : yourProjects[i]._id});
      }
    } catch (error) {}
  };
  const handleUserDelete = async () => {
    try {
      await userAccountDelete({ID : userData._id});
    } catch (error) {}
  };
  const handleDeleteUser = async () => {
    try {
      await handleProjectsDelete();
      await handleUserDelete();
      setIsModalOpen(false);
      logout();
    } catch (error) {
      alert("An error occured");
    }
    
  };
  if( !isAuthenticated )
  { 
    return (<div className='loader-message'>
      <ThreeDots 
        color="#000000"
        height={50}
        width={50}
      />
    </div>);
  }
  else
  {
    return (
      <>
        <Modal
          className='project-delete-modal'
          isOpen={isModalOpen}
          onRequestClose={handleCloseModal}
        >
          <div className='project-delete-modal-content'>
            <h2>Delete Confirmation</h2>
            <p>All the app data like projects & it's details will be permanently deleted. <br/> Are you sure you want to delete this account ? </p>
            <div className='modal-buttons'>
              <button className='delete-modal-button' onClick={handleDeleteUser}>Delete</button>
              <button className='cancel-modal-button' onClick={handleCloseModal}>Cancel</button>
            </div>
          </div>
        </Modal>
        <div className='user-info-div'>
          <div className='user-image'>
            <img src={user.picture} /> 
          </div> 
          <div className='user-info'>
            <p className='info-name'>{user.name}</p>
            <p className='info-email'>{user.email}</p>
          </div>
        </div>

        
        <div className='projects'>
          <div className='sub-heading-div'>
            <p className='subheading' >Your Projects</p>
            { loadCount==totalCount && loadCount!=0 && <p className='subheading-data' >({totalCount})</p>}
            { !(loadCount==totalCount && loadCount!=0) && !( yourProjects && yourProjects.length==0) &&
              <div className='subheading-data-loader-div'>
                <div className="spinner"></div>
                { loadCount!=0 && totalCount!=0 && <p>{Math.round((loadCount / totalCount) * 100)}%</p>}
              </div>
            }
          </div>
          
          <div className='projects-in'>
            {  yourProjects && yourProjects.length>0 && yourProjects.map((project) => (
              <div key={project._id} className='project' onClick={() => handleProjectOpen(project._id)}>
                <div className='image'>
                { project.coverphoto!=""
                  ? <img src={project.coverphoto} />
                  : <img src={imagePath} />
                }
                </div>
                  <div className='title'><p>{(project.title.length>15) ? project.title.slice(0,15)+"..." : project.title }</p></div>
              </div>
            ))}
            {
              (yourProjects==null)  && emptyList.map((current)=>(
                <div className='project'> 
                  <p className='loading-text'>{current}</p>  
                </div>
              ))
            }
            {
              ( yourProjects && yourProjects.length==0) &&
                <div className='project'> 
                  <p className='no-project-text'>No Projects</p>  
                </div>
            }
          </div>
          <div className='profile-buttons'>
            <button className='button-logout' onClick={handleLogOut}>LOG OUT</button>  
            <button className='button-delete-account' onClick={handleAccountDeleteModal}>DELETE ACCOUNT</button>  
          </div>
        </div>
      </>
    );
  }
}

export default Profile;
