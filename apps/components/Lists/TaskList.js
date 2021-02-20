import React, { useState, useEffect, useContext } from 'react'
//cssのデザインは、EventListと共有
import styles from './TaskList.module.css'
//others
import { TasksContext } from '../../pages/_app'
//components
import { EachTask } from './EachTask'

//props {activeDate: date,}
export const TaskList = (props) => {
  //APIから得られたdataの配列を取り出す必要はある
  const { tasks_data } = useContext(TasksContext);

  //taskのfilterを管理
  const [taskfilter, setTaskfilter] = useState('all');

  //カレンダーの月から始まるtasksを選別する
  const [currentTasks, setCurrentTasks] = useState([])

  //実際に表示するeventsを選定
  const [actualTasks, setActualTasks] = useState([])

  const active_year = props.activeDate.getFullYear()
  const active_month = props.activeDate.getMonth() + 1

  //日付を確認用のコード
  const today = new Date()
  //eventの日付と今日の日付を比べて、過去かどうかを調べる
  const list_class = (today, target_date, target_month, target_year) => {
    const today_date = today.getDate()
    const today_month = today.getMonth() + 1
    const today_year = today.getFullYear()
    //yearが小さい　過去
    if (today_year > target_year) {
      return `${styles.past}`
    }
    //yearが同じでもmonthが小さい　過去
    else if (today_year === target_year && today_month > target_month) {
      return `${styles.past}`
    }
    //year,month同じでもdateが小さい　過去
    else if (today_year === target_year && today_month === target_month) {
      return today_date > target_date ? ` ${styles.past}` : 'normal'
    } else {
      return 'normal'
    }
  }

  //ここで、tasks_dataからカレンダーの月に該当するタスクを取得
  useEffect(function () {
    //tasks_dataに値がセットされていなければ、return
    if (tasks_data === undefined) {
      return
    } else if (!tasks_data.hasOwnProperty('tasks')) {
      return
    }

    const tasks = tasks_data.tasks
    const Current_Tasks = tasks.filter((task) => {
      return (task.month === active_month && task.year === active_year)
    })
    setCurrentTasks(Current_Tasks)
  }, [props.activeDate, tasks_data])

  // currentTasksから実際に表示するタスクを選択
  useEffect(function () {
    //currentTasksに値がセットされていなければ、return
    if (currentTasks.length === 0) {
      setActualTasks([])
    }
    let Filtered_Tasks = []
    switch (taskfilter) {
      case "TASKS":
        Filtered_Tasks = currentTasks.filter((task) => {
          return (task.completed === false)
        })
        break;
      case "COMPLETED":
        Filtered_Tasks = currentTasks.filter((task) => {
          return (task.completed === true)
        })
        break;
      default:
        Filtered_Tasks = currentTasks
        break;
    }
    setActualTasks(Filtered_Tasks)
  }, [currentTasks, taskfilter])



  return (
    <>
      <h3 className={styles.title}>タスク一覧　{active_year}年 {active_month}月 </h3>
      <div className={styles.eventlist}>
        <div className={styles.task_buttons}
        >
          <button className={`${styles.task_button} ${styles.green}`} onClick={() => setTaskfilter("ALL")}>All</button>
          <button className={`${styles.task_button} ${styles.red}`} onClick={() => setTaskfilter("TASKS")}>Tasks</button>
          <button className={`${styles.task_button} ${styles.blue}`} onClick={() => setTaskfilter("COMPLETED")}>Completed</button>
        </div>
        <ul className={styles.lists}>
          {actualTasks.map(task => (
            <li key={task.id} className={list_class(today, task.date, task.month, task.year)}><EachTask date={task.date} title={task.title} memo={task.memo} id={task.id} completed={task.completed} /></li>
          ))}
        </ul>
      </div>
    </>
  )

}
