import React, { useState, useEffect, useContext } from 'react'
import styles from './EventList.module.css'
//others
import { EventsContext } from '../../pages/_app'


//props {activeDate: date}
export const EventList = (props) => {
  const { events } = useContext(EventsContext);
  const [actualEvents, setActualEvents] = useState([])
  //表示するeventsを決定
  useEffect(function () {
    setActualEvents(events)
  }, [events])

  return (
    <>
      <h3 className={styles.title}>予定一覧　{props.activeDate.getFullYear()}年 {props.activeDate.getMonth() + 1}月 </h3>
      <div className={styles.eventlist}>
        <ul className={styles.lists}>
          {actualEvents.map(event => (
            <li key={event.id} className={styles.list_each}>{event.title}</li>
          ))}
        </ul>
      </div>
    </>
  )

}
