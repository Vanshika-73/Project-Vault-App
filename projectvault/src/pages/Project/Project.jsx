import React, { useState } from 'react';
import './Project.css';
import { useLocation, useNavigate } from 'react-router-dom';
import Rating from '../../Components/Rating/Rating';
import { useAuth0 } from "@auth0/auth0-react";
import { checkProjectDownloadEligibilty, fetchProjectfromDB } from '../../Service/api';
import { ThreeDots  } from 'react-loader-spinner';
import Description from '../../Components/Description/Description';
import { updateProject } from '../../Service/api';
import { isProjectDeleted, updateUserData, moveProjectToDeleted, projectDelete, fetchAllProjectsOfUser } from '../../Service/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faMultiply, faTrash } from '@fortawesome/free-solid-svg-icons';
import Modal from 'react-modal';

function Project() {
  const imagePath = process.env.PUBLIC_URL + '/images/coverImage.png';
  const notFoundImagePath = process.env.PUBLIC_URL + '/images/not-found.jpg';
  const deletedImagePath = process.env.PUBLIC_URL + '/images/deleted.png';
  const { isAuthenticated, user , loginWithPopup} = useAuth0();
  const { search } = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(search);
  const projectID = queryParams.get('projectID');
  const [eligible, setEligible] = useState(null);
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [rateOpen, setRateOpen] = useState(false);
  const [Prating, setPRating] = useState(null);
  const [isOwner, setIsOwner] = useState(false);
  const [userData, setUserData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projectDeleted, setProjectDeleted] = useState(false);

  React.useEffect( () => {
    fetchProject();
    if (isAuthenticated && project)
    {
      initiateCheck();
    }
  }, []);
  React.useEffect( () => {
    if (isAuthenticated)
    fetchProjectList();
  }, [isAuthenticated]);
  const fetchProjectList = async () => {
    try {
      const ProjectsResponse = await fetchAllProjectsOfUser(user.email);
      setUserData(ProjectsResponse.projects);
      const obj = ProjectsResponse.projects.documents;
      for( var i=0 ; i<obj.length ; i++ )
        {
          if( projectID == obj[i] )
            {
              setIsOwner(true);
            }
        }
    } catch (error) {}
  };
  const fetchProject = async () => {
    try {
      const response = await fetchProjectfromDB(projectID);
      if( response.project!=null )
      {
          setLoading(false);
          setProject(response.project);
          const arr = response.project.rating;
          var c=0;
          for( var i=0 ; i<arr.length ; i++ )
          {
            c=c+arr[i].rate;
          }
          if(arr.length!=0)
          c=c/arr.length;
          setPRating(c);
      }
      else
      {
          const res = await isProjectDeleted(projectID);
          setLoading(false);
          if(res.deleted)
          {
            setProjectDeleted(true);
          }
      }
    } catch (error) {
      const res = await isProjectDeleted(projectID);
      setLoading(false);
      if(res.deleted)
      {
        setProjectDeleted(true);
      }
    }
    
  };
  const calculateRating = () => {
    try {
      const arr = project.rating;
      var c=0;
      for( var i=0 ; i<arr.length ; i++ )
      {
        c=c+arr[i].rate;
      }
      if(arr.length!=0)
      c=c/arr.length;
      setPRating(c);
    } catch (error) {
      alert("An error occured");
    }
    
  };
  const initiateCheck = async () => {
    try {
      const response = await checkProjectDownloadEligibilty(user.email,project._id);
      setEligible(response.eligible);
    } catch (error) {
      alert("An error occured");
    }
    
  };
  const handleDownload = async () => {
    try {
      if( user.email != project.owner )
      {
        const jsonData = project;
        if(!jsonData.downloads.includes(user.email))
        jsonData.downloads.push(user.email);
        await updateProject(jsonData);
      }
      // Navigate to project download page
      navigate(`/project-download?projectID=${project._id}`);
    } catch (error) {
      alert("An error occured");
    }
    
  };
  const handleBuy = () => {
    try {
      if (isAuthenticated) {
        // Implement payment logic
        setTimeout(() => {
          getData({ amount: project.price, email: user.email, buyer:user.email, seller:project.owner, projectID:project._id })
            .then((response) => {
              if (response) {
                const information = {
                  action: "https://securegw.paytm.in/order/process", // Update with the correct URL
                  params: response,
                };
                console.log(response);
                post(information);
              } else {
                console.error("Failed to get payment data");
              }
            })
            .catch((error) => {
              console.error("Error fetching payment data:", error);
            });
        }, 300);
      } else {
        alert("Login to Buy!");
      }
    } catch (error) {
      alert("An error occured");
    }
    
  };
  function isDate(val) {
    try {
      return Object.prototype.toString.call(val) === "[object Date]";
    } catch (error) {
      alert("An error occured");
    }
    // Cross realm comptatible
    
  };
  function isObj(val) {
    try {
      return typeof val === "object";
    } catch (error) {
      alert("An error occured");
    }
    
  };
  function stringifyValue(val) {
    try {
      if (isObj(val) && !isDate(val)) {
        return JSON.stringify(val);
      } else {
        return val;
      }
    } catch (error) {
      alert("An error occured");
    }
    
  };
  function buildForm({ action, params }) {
    try {
      const form = document.createElement("form");
      form.setAttribute("method", "post");
      form.setAttribute("action", action);

      Object.keys(params)?.forEach((key) => {
        const input = document.createElement("input");
        input.setAttribute("type", "hidden");
        input.setAttribute("name", key);
        input.setAttribute("value", stringifyValue(params[key]));
        form.appendChild(input);
      });

      return form
    } catch (error) {
      alert("An error occured");
    }
    
  };
  function post(details) {
    try {
      const form = buildForm(details);
      document.body.appendChild(form);
      form.submit();
      form.remove();
    } catch (error) {
      alert("An error occured");
    }
    
  };
  const getData = async (data) => {
    try {
      return fetch(`http://localhost:8000/payment`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .catch((err) => {
          console.error("Fetch error:", err);
          throw err;
        });
    } catch (error) {
      alert("An error occured");
    }
    
  };
  const handleRate = () => {
    setRateOpen(true);
  };
  const handleCloseRate = () => {
    setRateOpen(false);
  };
  const handleChooseRateOption = async (option) => {
    try {
      setRateOpen(false);

      const arr = project.rating;
      var flag=false;
      for( var i=0 ; i<arr.length ; i++ )
      {
        if(user.email==arr[i].email)
        {
          flag=true;
          arr[i].rate=option;
          break;
        }
      }
      if(!flag)
      {
        arr.push({email: user.email, rate: option});
      }

      const obj=project;
      obj.rating=arr;
      setProject(obj);
      calculateRating();

      await updateProject(project);
    } catch (error) {
      alert("An error occured");
    }
    
  };
  const handleProjectDelete = async () => {
    try {
      const res1 = await projectDelete({ID : projectID});
      const roughUserData = JSON.parse(JSON.stringify(userData));
      const obj = roughUserData.documents; 
      const newObj = [];
      for (var i = 0; i < obj.length; i++) {
        if (obj[i] !== projectID) {
          newObj.push(obj[i]); 
        }
      }
      roughUserData.documents = newObj; 
      console.log(roughUserData);
      const res2 = await updateUserData(roughUserData);
      const res3 = await moveProjectToDeleted({id : projectID});
      try {
        if(res1.done && res2.done && res3.done)
        {
          window.location.reload();
        }
        else
        {
          alert('There was an error in deleting the project !');
        }
      } catch (error) {}
    } catch (error) {
      alert("An error occured");
    }
    
  };
  const handleDeleteItem = () => {
    handleProjectDelete();
    setIsModalOpen(false);
  };
  const handleDeleteClick = () => {
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const handleLoginButton = () => {
    loginWithPopup();
  };
  const handleEditClick = () => {
    try {
      navigate(`/edit-project?projectID=${project._id}`);
    } catch (error) {
      alert("An error occured");
    }
    
  };

  return (
    <>
      { (loading || project==null) && 
        <div className='no-project'>
        { !loading && project==null && !projectDeleted &&
          <img src={notFoundImagePath} />
        }
        { !loading && project==null && projectDeleted &&
          <div className='deleted'>
            <img src={deletedImagePath} />
            <p className='delete-message'>This project is deleted</p>
          </div>
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
      { project!=null && 
        <div className='body-project-outer'>
          <Modal
            className='project-delete-modal'
            isOpen={isModalOpen}
            onRequestClose={handleCloseModal}
          >
            <div className='project-delete-modal-content'>
              <h2>Delete Confirmation</h2>
              <p>Are you sure you want to delete this project ?</p>
              <div className='modal-buttons'>
                <button className='delete-modal-button' onClick={handleDeleteItem}>Delete</button>
                <button className='cancel-modal-button' onClick={handleCloseModal}>Cancel</button>
              </div>
              
            </div>
            
          </Modal>
          { isOwner && <div className='project-owner-area'>
            <FontAwesomeIcon onClick={handleEditClick} className='owner-buttons' icon={faEdit} />
            <FontAwesomeIcon onClick={handleDeleteClick} className='owner-buttons' icon={faTrash} />
          </div>}
          { !isOwner && <div className='extra-space-up'><p> </p></div>}
          <div className='body-project'>
            <div className='LHS'>
              { project.coverphoto!=""
                ? <img src={project.coverphoto} />
                : <img src={imagePath} />
              }
            </div>
            <div className='RHS'>
              <p className='project-id-text'>ID : {project._id}</p>
              <h2>{project.title}</h2>
              <Description text={project.description} maxLength={150}  />
              <p><b>You will get :</b></p>
              <div className='av-docs'>
                {project.documents.map((docs,index) => (
                  <div key={index}>
                    <div className='doc'><p>{docs.key}</p></div>
                  </div>
                ))}
              </div>
              { Prating!=null && <div className='rating-div'>
                <div className='rating-show'>
                  <Rating rating={Prating} /> 
                  { isAuthenticated && !rateOpen && <button  className='rate-button' onClick={handleRate}>+</button> }
                </div>
                { rateOpen &&
                  <div className='rate-option'>
                    <button  className='rate-option-button' onClick={()=>handleChooseRateOption(1)}>1</button>
                    <button  className='rate-option-button' onClick={()=>handleChooseRateOption(2)}>2</button>
                    <button  className='rate-option-button' onClick={()=>handleChooseRateOption(3)}>3</button>
                    <button  className='rate-option-button' onClick={()=>handleChooseRateOption(4)}>4</button>
                    <button  className='rate-option-button' onClick={()=>handleChooseRateOption(5)}>5</button>
                    {/* <button  className='rate-option-button' onClick={()=>handleChooseRateOption(0)}>0</button> */}
                    <button  className='rate-option-close-button' onClick={handleCloseRate}>
                    <FontAwesomeIcon className='icon' icon={faMultiply} />
                    </button>
                  </div>
                }
              </div>}
              
              <p><strike>₹{project.price}</strike> <b>Free</b></p>
              {/* { eligible 
                ? <button type="button" onClick={handleDownload}>Download</button>
                : <button type="button" onClick={handleBuy}>Buy</button>
              } */}
              <div className='download-section'>
                { isAuthenticated &&
                  <button className='download-button' type="button" onClick={handleDownload}>Download</button>}
                { !isAuthenticated &&
                  <button className='download-button' type="button" onClick={handleLoginButton}>Login to download</button>}
                <p className='downloads-text'>( {project.downloads.length} downloads )</p>
              </div>
            </div>
          </div>
          <div className='extra-space-down'>
            <p> </p>
          </div>
        </div>
      }
    </>
  );
}

export default Project;
