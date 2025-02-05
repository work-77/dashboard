import { API_URL2 as API_URL } from '@/config/constants';
import axios from 'axios'

export const fetchProjects = async () => {
    try {
      const response = await axios.get(`${API_URL}/projects`);
      return response.data;
    } catch (error) {
      console.error('Error fetching projects:', error);
      throw error;
    }
  };
  
export const fetchLocations = async () => {
try {
    const response = await axios.get(`${API_URL}/locations`);
    return response.data;
} catch (error) {
    console.error('Error fetching locations:', error);
    throw error;
}
};

export const fetchFeatures = async () => {
  try {
      const response = await axios.get(`${API_URL}/features`);
      return response.data;
  } catch (error) {
      console.error('Error fetching features:', error);
      throw error;
  }
  };

export const fetchDevelopers = async () => {
try {
    const response = await axios.get(`${API_URL}/developers`);
    return response.data;
} catch (error) {
    console.error('Error fetching developers:', error);
    throw error;
}
};

export const addDeveloper = async (developerData: {
  name: string;
  email: string;
  phone_number: string;
  website?: string;
  description?: string;
  status: string;
}) => {
  try {
    const response = await axios.post(`${API_URL}/developers`, developerData);
    return response.data; // Return the created developer
  } catch (error) {
    console.error('Error adding developer:', error);
    throw error;
  }
};

export const addProject = async (projectData: any) => {
  try {
    const response = await axios.post(`${API_URL}/projects`, projectData);
    return response.data; // Return the created developer
  } catch (error) {
    console.error('Error adding project:', error);
    throw error;
  }
};