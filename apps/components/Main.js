import React, { useState, useEffect } from 'react'
import Calender from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import styles from './Main.module.css'
//components
import { EventFrom } from './Forms/EventForm'


export const Main = () => {
  //react-calendar用のstate
  const [value, onChange] = useState(new Date());
  const [activeDate, setActiveDate] = useState(new Date());
  //EventForm用のstate
  const [isEventForm, setIsEventForm] = useState(false);

  const today = new Date();



  return (
    <>
      <Calender
        className={styles.main}
        onChange={onChange}
        onClickDay={(value, event) => {
          setIsEventForm(true);
        }}
        onActiveStartDateChange={({ activeStartDate, value, view }) => setActiveDate(activeStartDate)}
        tileClassName={styles.height}
        // tileContent={({ date, view }) => setTileContent(date, view)}

        value={value}
        showNeighboringMonth={false}
        minDate={new Date(2000, 1, 1)}
        maxDate={new Date(2100, 1, 1)}
        // locale={"ja-JP"}
        view={"month"}
      />
      {isEventForm && (
        <EventFrom date={value} setIsEventForm={setIsEventForm} />
      )}
    </>
  );
}
