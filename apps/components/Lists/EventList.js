import React, { useState, useEffect, useContext } from 'react'
import styles from './EventList.module.css'
//others
import { EventsContext } from '../../pages/_app'


//props {activeDate: date}
export const EventList = (props) => {
  const active_year = props.activeDate.getFullYear()
  const active_month = props.activeDate.getMonth() + 1
  // const active_date = props.activeDate.getDate()
  //日付を確認用のコード
  const today = new Date()
  // const today_date = today.getDate()

  //eventの日付と今日の日付を比べて、過去かどうかを調べる
  const list_class = (today, target_date, target_month, target_year) => {
    const today_date = today.getDate()
    const today_month = today.getMonth() + 1
    const today_year = today.getFullYear()

    if (today_date > target_date || today_month > target_month || today_year > target_year) {
      return `${styles.list_each} ${styles.past}`
    } else {
      return styles.list_each
    }
  }

  const { events } = useContext(EventsContext);
  const [actualEvents, setActualEvents] = useState([])
  //表示するeventsを決定
  useEffect(function () {
    const filteredevents = events.filter((event) => {
      return (event.month === active_month && event.year === active_year)
    })
    setActualEvents(filteredevents)
  }, [events, props.activeDate])

  return (
    <>
      <h3 className={styles.title}>予定一覧　{active_year}年 {active_month}月 </h3>
      <div className={styles.eventlist}>
        <ul className={styles.lists}>
          {actualEvents.map(event => (
            <li key={event.id} className={list_class(today, event.date, event.month, event.year)}><span className={styles.list_date}>{event.date}日</span>{event.title} </li>
          ))}
        </ul>
      </div>
    </>
  )

}
