import axios from 'axios';
import queryString from 'query-string';
import { TimeTrackingInterface, TimeTrackingGetQueryInterface } from 'interfaces/time-tracking';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getTimeTrackings = async (
  query?: TimeTrackingGetQueryInterface,
): Promise<PaginatedInterface<TimeTrackingInterface>> => {
  const response = await axios.get('/api/time-trackings', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createTimeTracking = async (timeTracking: TimeTrackingInterface) => {
  const response = await axios.post('/api/time-trackings', timeTracking);
  return response.data;
};

export const updateTimeTrackingById = async (id: string, timeTracking: TimeTrackingInterface) => {
  const response = await axios.put(`/api/time-trackings/${id}`, timeTracking);
  return response.data;
};

export const getTimeTrackingById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/time-trackings/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteTimeTrackingById = async (id: string) => {
  const response = await axios.delete(`/api/time-trackings/${id}`);
  return response.data;
};
