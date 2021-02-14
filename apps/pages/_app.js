import '../styles/globals.css'
import { useState, useEffect, createContext } from 'react';
import Auth from '../modules/auth';

export const UserContext = createContext();
const endpoint = `${process.env.API_ENDPOINT}auto_login`

function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState({ email: '', id: 0, name: '' })
  const Uservalue = {
    user,
    setUser,
  };

  //tokenがあれば自動login
  useEffect(function () {
    const token = Auth.getToken();
    if (token === 'undefined') {
      Auth.logout();
      return
    }
    if (user.id === 0 && token) {
      fetch(endpoint, {
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

  return (
    <UserContext.Provider value={Uservalue}>
      <Component {...pageProps} />
    </UserContext.Provider>
  )
}

export default MyApp
