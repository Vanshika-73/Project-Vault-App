import React, { useState, useEffect , useRef } from 'react';
import './Home.css';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";
import { fetchDropDownDataDB, fetchProjectfromDB, getHomeFeatureProjects } from '../../Service/api';
import { useData } from '../../DataContext';

function Home() {
  const imagePath = process.env.PUBLIC_URL + '/images/homescreen-title-photo.png';
  const { isAuthenticated, user, loginWithPopup } = useAuth0();
  const navigate = useNavigate();
  const [domainValue, setdomainValue] = useState(''); 
  const [TopicValue, setTopicValue] = useState('All');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [featureProjectsFetched, setFeatureProjectsFetched] = useState(false);
  const [domains, setDomains] = useState([]);
  const [topics, setTopics] = useState([]);
  const [featureProjects, setFeatureProjects] = useState([]);
  const [emptyFeatureProjects, setEmptyFeatureProjects] = useState([1,2,3]);
  const { dropdownData, setDropDownDataFunction } = useData();
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
  React.useEffect(()=>{
    if(dropdownData==null)
    fetchDropDownData();
    else
    setDomainsArray(dropdownData);
  },[]);
  React.useEffect(()=>{
    if(featureProjects.length==0)
      fetchHomeFeatureProjects();
  },[]);
  useEffect(() => {
    setTopicsArray();
    setTopicValue('All');
  }, [domainValue]);
  const fetchDropDownData = async () => {
    try {
      const response = await fetchDropDownDataDB({ range : 'available' });
      await setDomainsArray(response.data.domain);
      setDropDownDataFunction(response.data.domain);
    } catch (error) {}
    
  };
  const setDomainsArray = async (inputObject) => {
    try {
      const dynamicOptions = [];
      for (const key in inputObject) {
        dynamicOptions.push(key);
      }
      setDomains(dynamicOptions);
    } catch (error) {
        alert("An error occured");
    }
      
  };
  const setTopicsArray = async () => {
    try {
      const dynamicOptions = [];
      for (const key in dropdownData) {
        if(key==domainValue)
        {
          setTopics(dropdownData[key]);
          break;
        }
      }
    } catch (error) {
        alert("An error occured");
    }
    
  };
  const handleOption1Change = (event) => {
    try {
      setdomainValue(event.target.value);
    } catch (error) {
      alert("An error occured");
    }
    
  };
  const handleOption2Change = (event) => {
    try {
      setTopicValue(event.target.value);
    } catch (error) {
      alert("An error occured");
    }
    
  };
  const handleSubmit = (event) => {
    try {
      event.preventDefault();
      setFormSubmitted(true);
      if(domainValue=='')
      return;
      setFormSubmitted(false);
      navigate(`/project-list?domain=${domainValue}&topic=${TopicValue}`);
    } catch (error) {
      alert("An error occured");
    }
    
  };
  const fetchHomeFeatureProjects = async () => {
    try {
      const response = await getHomeFeatureProjects();
      const allDomains = response.projects;
      const fProjects = [];
      for( var i=0 ; i<allDomains.length ; i++ )
      {
        const PIDs = allDomains[i].projects;
        const objProjects = [];
        for( var j=0 ; j<PIDs.length ; j++ )
        {
          try {
            const res = await fetchProjectfromDB(PIDs[j]);
            if(res.project!=null)
            {
              objProjects.push(res.project);
            }
          } catch (error) {}
        }
        const currObj = {
          title : allDomains[i].topic,
          coverphoto : allDomains[i].coverphoto,
          projects : objProjects,
        };
        fProjects.push(currObj);
        setFeatureProjects(fProjects);
      }
      setFeatureProjectsFetched(true);
    } 
    catch (error) {}
  };
  const handleProjectClick = (PID) => {
    navigate(`/project?projectID=${PID}`);
  };
  const handleSellButton = () => {
    navigate(`/addproject`);
  };
  const handleLoginButton = () => {
    loginWithPopup();
  };
  return (
    <>
      <div className='body-div1'>
        <div className='body-div1-content'>
          <div>
            {screenWidth<=600 && 
              <div className='body-div1-image-mob'>
                <img src={imagePath} />
              </div>
            }
            <h1>Explore, Download, Use</h1>
            <p>Access projects with comprehensive reports and supporting materials.</p>
          </div>
          { domains && topics && 
          <form onSubmit={handleSubmit}>
            <div className='dropdown'>
              <select className={`dropdown-box${formSubmitted && domainValue === '' ? '-error' : ''}`} value={domainValue} onChange={handleOption1Change}>
                <option value=''>Select Domain</option>
                {domains.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <div className='dropdown'>
              <select className='dropdown-box' value={TopicValue} onChange={handleOption2Change}>
                <option value=''>Select Topic</option>
                {topics.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <button type='submit'>Search Projects</button>
          </form>}
        </div>
        <div className='body-div1-image'>
          <img src={imagePath} />
        </div>
      </div>
      <div className='body-div2'>
        <h2 className='body-div-headings'>Get your academic projects</h2>
        {featureProjects.length > 0 && featureProjects.map((domain, index1) => (
          <div>
            <h3 className='domain-heading'>{domain.title}</h3>
            <div key={index1} className='each-domain'>
              <div className='domain-projects'>
                { domain.projects.length > 0 && domain.projects.map((project,index2)=>(
                  <div 
                    key={index2} 
                    onClick={()=>handleProjectClick(project._id)} 
                    className='each-project-outer'
                    >
                    <div className='each-project-image'>
                      <img src={project.coverphoto} />
                    </div>
                    <div className='each-project-content'>
                      <h4>{project.title}</h4>
                      { screenWidth>600 && 
                        <p>{project.description.length > 60 ? `${project.description.substring(0, 60)}...` : project.description}</p>
                      }
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
        { featureProjects.length == 0 && 
          <div>
            <h3 className='domain-heading'>Loading</h3>
            <div className='each-domain'>
              <div className='domain-projects'>
                { emptyFeatureProjects.map((num)=>(
                  <div className='each-project-outer'>
                      <p> </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        }
        { !featureProjectsFetched && 
          <div>
          <h3 className='domain-heading'>Loading</h3>
          <div className='each-domain'>
            <div className='domain-projects'>
              { emptyFeatureProjects.map((num)=>(
                <div className='each-project-outer'>
                <div className='each-project'>
                    <p> </p>
                </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        }
      </div>
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

export default Home;