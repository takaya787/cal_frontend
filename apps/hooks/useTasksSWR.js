import useSWR from 'swr';
//others
import Auth from '../modules/auth'

export const TasksUrl = `${process.env.API_ENDPOINT}tasks`

//SWR用のfetcher
const Taskfetcher = () => fetch(TasksUrl, {
  method: 'GET',
  headers: {
    'Authorization': `Bearer ${Auth.getToken()}`,
    'Content-Type': 'application/json'
  }
}).then(res => res.json())

// const fetcher = () => fetch(TasksUrl).then(res => res.json())

export const useTasksSWR = () => {
  const { data: tasks_data, error: task_errors } = useSWR(TasksUrl, Taskfetcher);

  return { tasks_data, task_errors }
}
