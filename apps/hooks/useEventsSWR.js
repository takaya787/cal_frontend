import useSWR from 'swr';
//others
import Auth from '../modules/auth'

export const EventsUrl = `${process.env.API_ENDPOINT}events`

//SWR用のfetcher
const Eventfetcher = () => fetch(EventsUrl, {
  method: 'GET',
  headers: {
    'Authorization': `Bearer ${Auth.getToken()}`,
    'Content-Type': 'application/json'
  }
}).then(res => res.json())

// const fetcher = () => fetch(TasksUrl).then(res => res.json())

export const useEventsSWR = () => {
  const { data: events_data, error: event_errors } = useSWR(EventsUrl, Eventfetcher);

  return { events_data, event_errors }
}
