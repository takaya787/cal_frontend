import Head from 'next/head'
import styles from '../styles/Home.module.css'
//components
import { Main } from '../components/Main'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Calender App</title>
      </Head>
      <h1>カレンダーでスケジュール管理！</h1>
      <Main />
    </div>
  )
}
