import React, { useState, useEffect } from 'react'
import Calender from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import styles from './Main.module.css'

export const Main = () => {
  const [value, onChange] = useState(new Date());
  const today = new Date();
  const setTileContent = (date, view) => {
    if (view === 'month' && date.getDay() === 0) {
      return (<>It's Sunday!</>)
    } else if (view === 'month' && date.getDay() === 1) {
      return (<>Start monday tt</>)
    } else if (view === 'month' && date.getMonth() === today.getMonth() && date.getDate() === today.getDate()) {
      return (<>todos</>)
    }
    else {
      null
    }
  }

  //({ date, view }) => view === 'month' && date.getDay() === 0 ? <p>It's Sunday!</p> : null
  return (
    <>
      <Calender
        className={styles.main}
        onChange={onChange}
        onClickDay={(value, event) => {
          console.log('Clicked Day:', value)
        }}
        tileClassName={styles.height}
        tileContent={({ date, view }) => setTileContent(date, view)}
        // tileContent={({ date, view }) => view === 'month' && date.getDay() === 0 ? <p>It's Sunday!</p> : null}
        value={value}
        showNeighboringMonth={false}
        minDate={new Date(2000, 1, 1)}
        maxDate={new Date(2100, 1, 1)}
      />
    </>
  );
}
