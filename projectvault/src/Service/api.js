import axios from 'axios';
import {ref, uploadBytes, getDownloadURL} from 'firebase/storage';
import { storage } from '../firebase-config';
const API_URI = process.env.API_URI;

export const uploadFile = async (file, fileName) => {
    try {
      const storageRef = ref(storage, fileName);
      await uploadBytes(storageRef, file);
      
      const snapshot = await uploadBytes(storageRef, file);
      const downloadUrl = await getDownloadURL(snapshot.ref);
      
      return downloadUrl;
    } catch (error) {
      console.error('Error uploading file:', error);
      throw error;
    }
  };

export const uploadDocument = async (data) => {
    try {
        const response = await axios.post(`${API_URI}/document-upload`, JSON.stringify(data), {
            headers: {
              'Content-Type': 'application/json',
            },
          });
        return response.data;
    } catch (error) {
        console.log('Error while calling the API ', error.message);
    }
}

export const addUserSignInDataToDB = async (data) => {
    try {
        const response = await axios.post(`${API_URI}/add-user-sign-in-data`, JSON.stringify(data), {
            headers: {
              'Content-Type': 'application/json',
            },
          });
        return response.data;
    } catch (error) {
        console.log('Error while calling the API ', error.message);
    }
}

export const checkUserExists = async (data) => {
    try {
        const response = await axios.post(`${API_URI}/check-user-exists`, JSON.stringify(data), {
            headers: {
              'Content-Type': 'application/json',
            },
          });
        return response.data;
    } catch (error) {
        console.log('Error while calling the API ', error.message);
    }
}

export const connectProjectToUser = async (data) => {
    try {
        const response = await axios.post(`${API_URI}/connect-project-user`, JSON.stringify(data), {
            headers: {
              'Content-Type': 'application/json',
            },
          });
        return response.data;
    } catch (error) {
        console.log('Error while calling the API ', error.message);
    }
}

export const fetchProjectList = async (selectedDomain, selectedTopic) => {
    try {   
        // Make an API request to fetch data from the database
        const response = await axios.get(`${API_URI}/get-projects-list`, {
            params: {
                domain: selectedDomain,
                topic: selectedTopic,
            },
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error.message);
    }
};

export const checkProjectDownloadEligibilty = async (email, projectID) => {
    try {   
        // Make an API request to fetch data from the database
        const response = await axios.get(`${API_URI}/check-project-eligibilty`, {
            params: {
                email: email,
                projectID: projectID,
            },
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error.message);
    }
};

export const getBalance = async (data) => {
    try {   
        // Make an API request to fetch data from the database
        const response = await axios.get(`${API_URI}/get-balance`, {
            params: {
                email: data.email,
            },
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error.message);
    }
};

export const updateEarn = async (data) => {
    try {
        const response = await axios.post(`${API_URI}/update-earn`, JSON.stringify(data), {
            headers: {
              'Content-Type': 'application/json',
            },
          });
        return response.data;
    } catch (error) {
        console.log('Error while calling the API ', error.message);
    }
};

export const addProjectInSold = async (data) => {
    try {
        const response = await axios.post(`${API_URI}/update-sold`, JSON.stringify(data), {
            headers: {
              'Content-Type': 'application/json',
            },
          });
        return response.data;
    } catch (error) {
        console.log('Error while calling the API ', error.message);
    }
};

export const fetchDropDownDataDB = async (data) => {
    try {
        const response = await axios.get(`${API_URI}/get-dropdown-data`, {
            params: {
                range: data.range,
            }
            , 
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        console.log('Error while calling the API ', error.message);
    }
};

export const fetchProjectfromDB = async (projectID) => {
    try {
        const response = await axios.get(`${API_URI}/fetch-project`, {
            params: {
                projectID: projectID,
            },
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        console.log('Error while calling the API ', error.message);
    }
};

export const fetchAllProjectsOfUser = async (emailID) => {
    try {
        const response = await axios.get(`${API_URI}/fetch-projects-of-user`, {
            params: {
                email: emailID,
            },
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        console.log('Error while calling the API ', error.message);
    }
};

export const updateProject = async (data) => {
    try {
        const response = await axios.post(`${API_URI}/update-project`, JSON.stringify(data), {
            headers: {
              'Content-Type': 'application/json',
            },
          });
        return response.data;
    } catch (error) {
        console.log('Error while calling the API ', error.message);
    }
};

export const updateUserData = async (data) => {
    try {
        const response = await axios.post(`${API_URI}/update-user-data`, JSON.stringify(data), {
            headers: {
              'Content-Type': 'application/json',
            },
          });
        return response.data;
    } catch (error) {
        console.log('Error while calling the API ', error.message);
    }
};

export const projectDelete = async (data) => {
    try {
        const response = await axios.post(`${API_URI}/delete-project`, JSON.stringify(data), {
            headers: {
              'Content-Type': 'application/json',
            },
          });
        return response.data;
    } catch (error) {
        console.log('Error while calling the API ', error.message);
    }
};

export const userAccountDelete = async (data) => {
    try {
        const response = await axios.post(`${API_URI}/delete-user-account`, JSON.stringify(data), {
            headers: {
              'Content-Type': 'application/json',
            },
          });
        return response.data;
    } catch (error) {
        console.log('Error while calling the API ', error.message);
    }
};

export const moveProjectToDeleted = async (data) => {
    try {
        const response = await axios.post(`${API_URI}/move-project-to-deleted`, JSON.stringify(data), {
            headers: {
              'Content-Type': 'application/json',
            },
          });
        return response.data;
    } catch (error) {
        console.log('Error while calling the API ', error.message);
    }
};

export const updateAvailableDropDownDataDB = async (data) => {
    try {
        const response = await axios.post(`${API_URI}/update-available-dropdown`, JSON.stringify(data), {
            headers: {
              'Content-Type': 'application/json',
            },
          });
        return response.data;
    } catch (error) {
        console.log('Error while calling the API ', error.message);
    }
};

export const isProjectDeleted = async (projectID) => {
    try {
      const response = await axios.get(`${API_URI}/is-project-deleted`, {
        params: {
          projectID: projectID 
        }, 
        headers: {
            'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error while calling the API:', error.message);
      throw error;
    }
  };

export const checkProjectOwnership = async (email, projectID) => {
    try {
      const response = await axios.get(`${API_URI}/check-project-ownership`, {
        params: {
            email: email,
            projectID: projectID 
        }, 
        headers: {
            'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error while calling the API:', error.message);
      throw error;
    }
  };

export const getHomeFeatureProjects = async () => {
    try {  
        const response = await axios.get(`${API_URI}/get-home-feature-projects`, {
            headers: {
              'Content-Type': 'application/json',
            },
          });
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error.message);
    }
};

export const sendContactMessage = async (data) => {
    try {
        const response = await axios.post(`${API_URI}/send-contact-message`, JSON.stringify(data), {
            headers: {
              'Content-Type': 'application/json',
            },
          });
        return response.data;
    } catch (error) {
        console.log('Error while calling the API ', error.message);
    }
}