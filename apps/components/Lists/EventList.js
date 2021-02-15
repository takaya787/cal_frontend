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
    <div className={styles.eventlist}>
      <h3 className={styles.title}>Event一覧</h3>
      <ul className={styles.lists}>
        {actualEvents.map(event => (
          <li key={event.id} className={styles.list_each}>{event.title}</li>
        ))}
      </ul>
    </div>
  )

}
