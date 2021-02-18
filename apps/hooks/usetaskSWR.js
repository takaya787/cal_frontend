import { useState, useEffect } from 'react';
import useSWR from 'swr';
//others
import Auth from '../modules/auth'

export const TaskUrl = `${process.env.API_ENDPOINT}tasks`

//SWR用のfetcher
const Taskfetcher = () => {
  fetch(TaskUrl, {
    headers: {
      'Authorization': `Bearer ${Auth.gettoken()}`,
      'Content-Type': 'application/json'
    },
  }).then((res) => res.json())
}

export const usetaskSWR = () => {
  const { data, error } = useSWR(TaskUrl, Taskfetcher);

  //taskデータを保持するstate
  const [taskData, setTaskData] = useState([])

  //taskエラーを保持するstate
  const [taskError, setTaskError] = useState('')

  useEffect(function () {
    setTaskData(data);
    setTaskError(error);
  }, [])

  useEffect(function () {
    setTaskData(data);
    setTaskError(error);
  }, [data, error])

  return { data, error }
  // return { taskData, taskError }
}
