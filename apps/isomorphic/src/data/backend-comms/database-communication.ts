import { AreasDataType, DeveloperDataType, ProjectDataType } from '@/app/shared/roles-permissions/roles-permissions.types';
import { API_URL1 as API_URL, API_URL2 } from '@/config/constants';
import axios from 'axios'

const apiClient = axios.create({
  baseURL: API_URL || API_URL2,
  headers: {
    'Content-Type': 'application/json',
  },
});

const handleError = (error: any, endpoint: string) => {
  console.error(`Error with ${endpoint}:`, error);
  throw error;
};

const fetchData = async (endpoint: string) => {
  try {
    const response = await apiClient.get(endpoint);
    return response.data;
  } catch (error) {
    handleError(error, endpoint);
  }
};

const postData = async (endpoint: string, data: any) => {
  try {
    const response = await apiClient.post(endpoint, data);
    return response.data;
  } catch (error) {
    handleError(error, endpoint);
  }
};

const editData = async (endpoint: string, data: any) => {
  try {
    const response = await apiClient.put(endpoint, data);
    return response.data;
  } catch (error) {
    handleError(error, endpoint);
  }
};

// FETCH DATA
export const fetchProjects = () => fetchData('/projects');
export const fetchLocations = () => fetchData('/locations');
export const fetchFeatures = () => fetchData('/features');
export const fetchDevelopers = () => fetchData('/developers');
export const fetchAreas = () => fetchData('/areas');
export const fetchAddresses = () => fetchData('/addresses');
export const fetchMileStones = () => fetchData('/milestones');
export const fetchReviews = () => fetchData('/reviews');
export const fetchReservations = () => fetchData('/reservations');
export const fetchDeveloperFeatures = () => fetchData('/developer-features');
export const fetchDLDAreas = () => fetchData('/dldareas');
export const fetchCharts = () => fetchData('/charts');
export const fetchAreaDetails = (areaId: number) => fetchData(`/areas/${areaId}`);

// POST DATA
export const addDeveloper = (developerData: DeveloperDataType) => postData('/developers', developerData);
export const addProject = (projectData: ProjectDataType) => postData('/projects', projectData);

// EDIT DATA
export const editDeveloper = (developerId: number, developerData: DeveloperDataType) =>
  editData(`/developers/${developerId}`, developerData);

export const editProject = (projectId: number, projectData: ProjectDataType) =>
  editData(`/projects/${projectId}`, projectData);

export const editArea = (areaId: number, areaData: AreasDataType) =>
  editData(`/areas/${areaId}`, areaData);



// DELETE DATA

