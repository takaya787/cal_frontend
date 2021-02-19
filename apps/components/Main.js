import React, { useState, useEffect, useContext } from 'react'
import Calender from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import styles from './Main.module.css'
//components
import { PostFrom } from './Forms/PostForm'
import { EventList } from './Lists/EventList'
import { TaskList } from './Lists/TaskList'
//others

export const Main = () => {
  //react-calendar用のstate
  const [value, onChange] = useState(new Date());
  const [activeDate, setActiveDate] = useState(new Date());
  //EventForm用のstate
  const [isEventForm, setIsEventForm] = useState(false);

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
        <PostFrom date={value} setIsEventForm={setIsEventForm} />
      )}
      <div className={styles.board}>
        <div className={styles.inline}>
          <EventList activeDate={activeDate} />
        </div>
        <div className={styles.inline}>
          <TaskList activeDate={activeDate} />
        </div>
      </div>
    </>
  );
}
