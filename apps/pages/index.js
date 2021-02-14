import Head from 'next/head'
import styles from '../styles/Home.module.css'
//components
import { Main } from '../components/Main'
import { Modal } from '../components/Modal'
// import { UserForm } from '../components/Forms/UserForm'
// import { LoginForm } from '../components/Forms/LoginForm'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Calender App</title>
      </Head>
      <h1>カレンダーでスケジュール管理！</h1>
      <Modal />
      <Main />
    </div>
  )
}
