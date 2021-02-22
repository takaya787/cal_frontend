import React, { useState, useEffect, useContext } from 'react'
import Calender from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import styles from './Main.module.css'
//components
import { PostFrom } from './Forms/PostForm'
import { EventList } from './Lists/EventList'
import { TaskList } from './Lists/TaskList'
//contexts
import { TasksContext } from '../pages/_app'
import { EventsContext } from '../pages/_app'

export const Main = () => {
  //react-calendar用のstate
  const [value, onChange] = useState(new Date());
  const [activeDate, setActiveDate] = useState(new Date());
  //EventForm用のstate
  const [isEventForm, setIsEventForm] = useState(false);

  //Events,Tasksのcontextsを受け取る
  const { events_data } = useContext(EventsContext);
  const { tasks_data } = useContext(TasksContext);


  const getTileCircle = (date, view) => {
    if (view !== 'month') {
      return null;
    } else if (!events_data || !tasks_data) {
      return null;
    }
    //events,tasksが定義されてなかったらreturn
    if (!events_data.hasOwnProperty('events') || !tasks_data.hasOwnProperty('tasks')) {
      return null;
    }

    const events = events_data.events
    const tasks = tasks_data.tasks

    const event_include = events.some(function (event) {
      return event.date === date.getDate() && event.month === date.getMonth() + 1 && event.year === date.getFullYear()
    })

    const task_include = tasks.some(function (event) {
      return event.date === date.getDate() && event.month === date.getMonth() + 1 && event.year === date.getFullYear()
    })
    const show_circle = () => {
      if (task_include || event_include) {
        return true
      } else {
        return false
      }
    }

    return (
      <>
        {show_circle() && (
          <div className={styles.circle} />
        )}
      </>
    )
  }

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
        tileContent={({ date, view }) => getTileCircle(date, view)}

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
