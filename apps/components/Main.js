import React, { useState, useEffect } from 'react'
import Calender from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import styles from './Main.module.css'
//components
import { EventFrom } from './Forms/EventForm'

export const Main = () => {
  //react-calendar用のstate
  const [value, onChange] = useState(new Date());
  //EventForm用のstate
  const [isEventForm, setIsEventForm] = useState(false);

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

  return (
    <>
      <Calender
        className={styles.main}
        onChange={onChange}
        onClickDay={(value, event) => {
          console.log('Clicked Day:', value)
          setIsEventForm(true);
        }}
        tileClassName={styles.height}
        // tileContent={({ date, view }) => setTileContent(date, view)}

        value={value}
        showNeighboringMonth={false}
        minDate={new Date(2000, 1, 1)}
        maxDate={new Date(2100, 1, 1)}
      />
      {isEventForm && (
        <EventFrom date={value} setIsEventForm={setIsEventForm} />
      )}
    </>
  );
}
