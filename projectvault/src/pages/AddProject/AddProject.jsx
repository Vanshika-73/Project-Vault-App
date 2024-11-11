import React, { useState, useEffect } from 'react';
import './AddProject.css';
import { updateAvailableDropDownDataDB, fetchDropDownDataDB, uploadFile, uploadDocument, connectProjectToUser } from '../../Service/api';
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from 'react-router-dom';
import { ThreeDots } from 'react-loader-spinner'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { useData } from '../../DataContext';

const AddProject = () => {
  const { setLastVisitedPage } = useData();
  const [textInputs, setTextInputs] = useState({
    textInput1: '',
    textInput2: '',
  });
  const [fileInputs, setFileInputs] = useState([]);
  const [moreField, setmoreField] = useState(['']);
  const [stringFileMap, setStringFileMap] = useState(new Map());
  const [coverPhoto, setcoverPhoto] = useState('');
  const { isAuthenticated , user, isLoading } = useAuth0();
  const navigate = useNavigate();
  const [domain, setDomain] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [tag, setTag] = useState('');
  const [loading, setLoading] = useState(false);
  const [price, setPrice] = useState(0);
  const [domainList, setDomainList] = useState([]);
  const [topicList, setTopicList] = useState([]);
  const [projectLink, setProjectLink] = useState('');
  const [coverFileName, setCoverFileName] = useState('');
  const [addDocButtonOpen, setAddDocButtonOpen] = useState(false);
  const [dropdownData, setDropdownData] = useState(null);
  const coverInputRef = React.createRef();
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
  useEffect(() => {
      if( isAuthenticated )
      {
        setDomainsArray();
      }
  }, [isAuthenticated]);
  React.useEffect( () => {
    if( !isAuthenticated && !isLoading )
    {
      setLastVisitedPage(window.location.pathname + window.location.search);
      navigate(`/login`, {replace: true});
    }
  }, [isLoading]);

  useEffect(()=>{
    if(dropdownData==null)
    setDomainsArray();
  },[]);
  useEffect(()=>{
    setTopicsArray();
  },[domain]);
  
  const navigateToSuccess = () => {
    // Redirect to Success Page
    navigate(`/upload-success`);
  };
  const setDomainsArray = async () => {
    try {
      const response = await fetchDropDownDataDB({ range : 'all' }); 
      const domainData = response.data.domain;
      setDropdownData(domainData);
      const dynamicOptions = Object.keys(domainData); 
      setDomainList(dynamicOptions);
    } catch (error) {
      console.error('Error fetching dropdown data:', error);
    }
  };
  const handleButtonClick = () => {
    // Trigger the file picker input
    coverInputRef.current.click();
  };
  const setTopicsArray = async () => {
    var c=0;
    for (const key in dropdownData) {
      if(key==domain)
      {
        c=1;
        setTopicList(dropdownData[key]);
        break;
      }
    }
    if(c==0)
    setTopicList([]);
  };
  const handlePriceChange = (e) => {
    try {
        if( e.target.value<0 || e.target.value.length>6)
      return;
      setPrice(e.target.value);
    } catch (error) {
      alert("An error occured");
    }
    
  };
  const handleTagUnselect = (e) => {
    try {
        const selectedTag = e.currentTarget.dataset.value;
      // Add the selected tag into topicList
      setTopicList([...topicList, selectedTag]);
      // Remove the selected tag from the selectedTags array
      const updatedSelectedTags = selectedTags.filter((tag) => tag !== selectedTag);
      setSelectedTags(updatedSelectedTags);
    } catch (error) {
      alert("An error occured");
    }
  };
  const handleAddTag = (e) => {
    try {
      setSelectedTags([...selectedTags,e.target.value]);
      const updatedTopicList = topicList.filter(tag => tag !== e.target.value);
      setTopicList(updatedTopicList);
    } catch (error) {
      alert("An error occured");
    }
    
  };
  const handleDomainChange = (e) => {
    try {
      setDomain(e.target.value);
    } catch (error) {
      alert("An error occured");
    }
    
  };
  const handleProjectLinkChange = (e) => {
    try {
      if(e.target.value.length>500)
      return;
      setProjectLink(e.target.value);
    } catch (error) {
      alert("An error occured");
    }
    
  };
  const handleFileChange = (e, key) => {
    try {
      const file = e.target.files[0];
      setStringFileMap((prevMap) => new Map(prevMap.set(key, file)));
    } catch (error) {
      alert("An error occured");
    }
    
  };
  const handleTitleChange = (e) => {
    try {
      if(e.target.value.length>90)
      return;
      setTextInputs({ ...textInputs, [e.target.name]: e.target.value });
    } catch (error) {
      alert("An error occured");
    }
    
  };
  const handleDescriptionChange = (e) => {
    try {
      if(e.target.value.length>1000)
      return;
      setTextInputs({ ...textInputs, [e.target.name]: e.target.value });
    } catch (error) {
      alert("An error occured");
    }
    
  };
  const handleCoverPhotoChange = (e) => {
    try {
      setcoverPhoto(e.target.files[0]);
      setCoverFileName(e.target.files[0].name);
    } catch (error) {
      setcoverPhoto(null);
      setCoverFileName('');
    }
  };
  const handleCancelButtonClick = (e) => {
    setcoverPhoto(null);
    setCoverFileName('');
  };
  const handleTextmoreField = (e) => {
    try {
      if(e.target.value.length>50)
      return;
      setmoreField(e.target.value);
    } catch (error) {
      alert("An error occured");
    }
    
  };
  const deleteField = (input) => {
    try {
      stringFileMap.delete(input);
      setFileInputs(fileInputs.filter((item) => item !== input));
    } catch (error) {
      alert("An error occured");
    }
    
  };
  const addFileInput = () => {
    try {
      if( moreField=='' || fileInputs.includes(moreField))
      return;
      setmoreField('');
      const newFileInputs = [...fileInputs, moreField];
      setFileInputs(newFileInputs);
      setAddDocButtonOpen(false);
    } catch (error) {
      alert("An error occured");
    }
    
  };
  const handleAddDocButton = () => {
    try {
      if(stringFileMap.size<=10)
      setAddDocButtonOpen(true);
    } catch (error) {
      alert("An error occured");
    }
    
  };
  const disableAddDoc = () => {
    setAddDocButtonOpen(false);
  };
  const updateAvailableDropdowns = async (domain, tags) => {
    try {
      const response = await fetchDropDownDataDB({ range: 'available' });
      const object = response.data;
      const obj = response.data.domain;
      if (Object.keys(obj).includes(domain)) {
        tags.forEach((tag) => {
          if (!obj[domain].includes(tag)) {
            obj[domain].push(tag);
          }
        });
      } else {
        obj[domain] = tags;
      }
      object.domain=obj;
      await updateAvailableDropDownDataDB(object);
  
    } catch (error) {
      console.error('Error updating available dropdowns:', error);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if( domain && selectedTags.length>0 && stringFileMap.size>0){
      try {
        setLoading(true);
        setTimeout(() => {
          navigateToSuccess();
        }, 2000);
        // Create a javascript object to store all data
        const projectDocuments = [];
        // Storing necessary details in JS Object
        const projectData = {};
        projectData['title'] = textInputs.textInput1;
        projectData['description'] = textInputs.textInput2;
        projectData['rating'] = [];
        projectData['owner'] = user.email;
        projectData['price'] = price;
        projectData['projectlink'] = projectLink;
        // Add Domain & Topic Tags
        projectData['domain'] = domain;
        const tags=['All', ...selectedTags];
        projectData['tags'] = tags;

        await updateAvailableDropdowns(domain, tags);
        // Storing Cover Photo in JS Object if provided
        if (coverPhoto) {
            const coverPhotoLink = await uploadFile(coverPhoto, coverPhoto.name);
            projectData['coverphoto'] = coverPhotoLink;
        } else {projectData['coverphoto'] = "https://firebasestorage.googleapis.com/v0/b/project-vault-b6e5e.appspot.com/o/coverImage.png?alt=media&token=ac2709cb-bcf0-4f1a-9665-0f525d83ba20";}
        // Storing the document links in array
        for (const key of stringFileMap.keys()) {
            const file = stringFileMap.get(key);
            if (file) {
                const fileURL = await uploadFile(file, file.name);
                // Adding Document-DocumentLink as key-value pairs
                projectDocuments.push({ key, value: fileURL });}}
        // Added documents object into our main object.
        projectData['documents'] = projectDocuments;
        // Uploaded Project to DB & recieved the documentID
        const projectDocumentData = await uploadDocument(projectData);
        // Storing the documentID in projects list of User.
        const documentIDData = {};
        documentIDData['id']=projectDocumentData.id;
        documentIDData['email']=user.email;
        await connectProjectToUser(documentIDData);

      } catch (error) {alert('There was an error while uploading project !');setLoading(false);}
    }
    else { alert('All required fields are not filled !');setLoading(false); }
  };

  if( !isAuthenticated )
  {
    return (
      <div className='loader-message'>
          <ThreeDots 
            color="#000000"
            height={50}
            width={50}
          />
        </div>
    );
  }
  else
  {
    return (
      <>
        <div className='form'>
        <div>
          <h1 className='upload-heading'>Upload New Project</h1>
        </div>
          
          <form onSubmit={handleSubmit}>
  
            <div className='inner-div'>
              <p className='label'>Title</p>
              <input type="text" name="textInput1" value={textInputs.textInput1} onChange={handleTitleChange} required />
            </div>
            
            <div className='inner-div'>
              <p className='label'>Description</p>
              <textarea rows={6} type="text" name="textInput2" value={textInputs.textInput2} onChange={handleDescriptionChange} required />
            </div>
            
            <div className='inner-div'>
              <p className='label'>Cover Photo (optional) </p> 
              <input type="file" ref={coverInputRef} name={`coverphoto`} style={{ display: 'none' }} onChange={(e) => handleCoverPhotoChange(e)} />
              { coverFileName=='' && <button type="button" className='cover-upload-button' onClick={handleButtonClick}>Choose File</button>}
              { coverFileName!='' && <div className='cover-selected-div'>
                <div className='p-text' ><p>{coverFileName} </p></div>
                <button type="button" className='delete' onClick={handleCancelButtonClick}>Delete File</button>
              </div>}
            </div>
  
            <div className='inner-div'>
              <p className='label'>Project Link (optional)</p>
              <input type="text" name="ProjectLink" value={projectLink} onChange={handleProjectLinkChange} />
            </div>
  
            <div id="fileInputsContainer">
              <p>Your Documents</p>
              {fileInputs.map((input, index) => (
                <div className='doc-box' key={input}>
                  <div className='doc-box-LHS'>
                    <div className='doc-box-label'><p>{`${input}`}</p></div>
                    <input type="file" className='doc-box-input' name={`fileInput[${index}]`} onChange={(e) => handleFileChange(e, input)} required />
                  </div>
                  <button className='doc-box-button' type="button"  onClick={(e) => deleteField(input)}>
                  <FontAwesomeIcon className='icon' icon={faTrash} />
                  </button>
                </div>
              ))}
            </div> 
  
            { !addDocButtonOpen && fileInputs.length<10 &&
              <button className='add-doc-button' type="button"  onClick={(e) => handleAddDocButton()}>
                +
              </button>
            }
            
            { addDocButtonOpen && 
              <div className='add-doc-section'>
                <div className='add-doc-inner-div'>
                  <p className='add-doc-label'>File Name</p>
                  <input type="text" className='add-doc-input' name="textInput2" value={moreField} onChange={handleTextmoreField} />
                </div>
                { screenWidth<=600 && 
                  <div className='add-doc-button-div'>
                    <button className='doc-button-in' type="button" onClick={addFileInput}>
                      Add
                    </button>
                    <button className='doc-button-in' type="button" onClick={disableAddDoc}>
                      Remove
                    </button>
                  </div>
                }
                { screenWidth>600 &&
                  <button className='doc-button-in' type="button" onClick={addFileInput}>
                    Add
                  </button>
                }
                { screenWidth>600 &&
                  <button className='doc-button-in' type="button" onClick={disableAddDoc}>
                    Remove
                  </button>
                }
                
              </div>
            }
            
  
            <p className='label' >Select Domain</p>
            <select className="dropdown" value={domain} onChange={handleDomainChange}>
              <option value="">Select...</option>
              {domainList.map((domain1)=>(
                <option key={domain1} value={domain1}>{domain1}</option>
              ))}
            </select>
            
            <p className='label' >Select Topic</p>
            <select className="dropdown" value={tag} onChange={handleAddTag}>
              <option value="">Select...</option>
              {topicList.map((domain1)=>(
                <option  key={domain1}  value={domain1}>{domain1}</option>
              ))}
            </select>
            
            <div className='tag-list'>
              {selectedTags.map((tag)=>(
                <p  key={tag} className='selected-tag' onClick={handleTagUnselect} data-value={tag}>{tag}</p>
              ))}
            </div>
            
            <div  className='inner-div'>
                <p className='label'>Price</p>
                <input type="number" name="Price" value={price} onChange={handlePriceChange} required />
            </div>
  
            { !loading 
              ? <button className='submit-button' type="submit">Submit</button>
              : <div className='submit-button'>
                  <ThreeDots 
                    color="#FFFFFF"
                    height={15}
                    width={50}  
                  />
                </div>
  
            }
            
            
          </form>
        </div>
      </>
      
    );
  }
  
};

export default AddProject;

