import { useState, useEffect } from 'react';
import axios from 'axios';

const ATTENDANCE_URL = 'http://localhost:3000/api/attendance/';

export const useAttendance = (userId, month) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState(null);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    // Skip the request if userId or month is not provided
    if (!userId || !month) {
      return;
    }

    const fetchAttendance = async () => {
      setIsLoading(true);
      setIsFetching(true);
      setIsError(false);
      setError(null);

      try {
        const response = await axios.get(
          `${ATTENDANCE_URL}/getattendancedetails/${userId}/${month}`
        );
        setData(response.data);
      } catch (err) {
        setIsError(true);
        setError(err.response?.data || 'An error occurred while fetching attendance data');
      } finally {
        setIsLoading(false);
        setIsFetching(false);
      }
    };

    fetchAttendance();
  }, [userId, month]);

  // Function to manually refetch data
  const refetch = async () => {
    if (!userId || !month) {
      return;
    }
    
    setIsFetching(true);
    setIsError(false);
    setError(null);

    try {
      const response = await axios.get(
        `${ATTENDANCE_URL}/getattendancedetails/${userId}/${month}`
      );
      setData(response.data);
    } catch (err) {
      setIsError(true);
      setError(err.response?.data || 'An error occurred while fetching attendance data');
    } finally {
      setIsFetching(false);
    }
  };

  return {
    data,
    isLoading,
    isError,
    error,
    isFetching,
    refetch
  };
};