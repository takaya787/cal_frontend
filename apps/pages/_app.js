import '../styles/globals.css'
import { useState, useEffect, createContext } from 'react';
import Auth from '../modules/auth';

export const UserContext = createContext();
export const EventsContext = createContext();

//Login処理用のURL
const LoginUrl = `${process.env.API_ENDPOINT}auto_login`
//Events取得用のURL
const EventsUrl = `${process.env.API_ENDPOINT}events`

function MyApp({ Component, pageProps }) {
  //ユーザー情報を取得する
  const [user, setUser] = useState({ email: '', id: 0, name: '' })
  const Uservalue = {
    user,
    setUser,
  };
  //ユーザーの全てのeventを取得する
  const [events, setEvents] = useState([])
  const Eventsvalue = {
    events,
    setEvents,
  };

  //tokenがあれば自動login
  useEffect(function () {
    const token = Auth.getToken();
    if (token === 'undefined') {
      Auth.logout();
      return
    }
    if (user.id === 0 && token) {
      fetch(LoginUrl, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
      })
        .then((res) => res.json())
        .then((data) => {
          // console.log('dataを表示')
          console.log(data) // {id: 1, email: "test@example.com"}
          if (data.error) {
            alert('ページをreloadしてください');
            return
          }
          const user_data = data.user
          setUser({ email: user_data.email, id: user_data.id, name: user_data.name });
        })
    }
  }, []) // [] => changed to => [user]

  //loginしていればそのユーザーのeventsを取得
  useEffect(function getEvents() {
    //Loginしていなければeventsは無し
    if (!Auth.isLoggedIn() || user.id === 0) {
      return setEvents([])
    }
    fetch(EventsUrl, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${Auth.getToken()}`
      }
    }).then(res => res.json())
      .then(data => {
        console.log(data);
        setEvents(data.events);
      })
  }, [user])

  return (
    <UserContext.Provider value={Uservalue}>
      <EventsContext.Provider value={Eventsvalue}>
        <Component {...pageProps} />
      </EventsContext.Provider>
    </UserContext.Provider>
  )
}

export default MyApp
