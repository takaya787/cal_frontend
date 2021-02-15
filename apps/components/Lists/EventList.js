import React, { useState, useEffect, useContext } from 'react'

import styles from './EventList.module.css'
//props {activeDate: date}
export const EventList = (props) => {
  const [actualEvents, setactualEvents] = useState([])

  return (
    <div className={styles.eventlist}>
      <h3 className={styles.title}>Event一覧</h3>
      <ul className={styles.lists}>
        <li className={styles.list_each}>sample 1</li>
        <li className={styles.list_each}>sample 2</li>
        <li className={styles.list_each}>sample 3</li>
        <li className={styles.list_each}>sample 1</li>
        <li className={styles.list_each}>sample 2</li>
        <li className={styles.list_each}>sample 3</li>
        <li className={styles.list_each}>sample 1</li>
        <li className={styles.list_each}>sample 2</li>
        <li className={styles.list_each}>sample 3</li>
      </ul>
    </div>
  )

}
