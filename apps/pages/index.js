import React, { useContext } from 'react';
import Head from 'next/head'
import styles from '../styles/Home.module.css'
//components
import { Main } from '../components/Main'
import { Modal } from '../components/Modal'
//others
import Auth from '../modules/auth'
import { UserContext } from './_app'

export default function Home() {
  const { user, setUser } = useContext(UserContext);

  const handleLogout = () => {
    setUser({ email: '', id: 0, name: '' });
    Auth.logout();
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Calender App</title>
      </Head>
      <h1>カレンダーでスケジュール管理！</h1>
      {!Auth.isLoggedIn() && (
        <Modal />
      )}
      {Auth.isLoggedIn() && (
        <>
          <p>Welcome {user.name}!</p>
          <button onClick={handleLogout}>Log out</button>
        </>
      )}
      <Main />
    </div>
  )
}
