import React, { useState, useContext } from 'react'
import { mutate } from 'swr';
//others
import Auth from '../../modules/auth'
import { TasksContext } from '../../pages/_app'
import styles from './TaskList.module.css'

//{ props: id: integer, date:integer,title:string, memo:text, completed:boolean}
export const EachTask = (props) => {
  //memo情報を表示するか決定
  const [showMemo, setShowMemo] = useState(false);
  const { TasksUrl } = useContext(TasksContext);

  //memo partの長さを調整するclass
  const each_style = () => {
    return showMemo ? `${styles.list_each} ${styles.longer}` : `${styles.list_each}`
  }

  //switch titleを変数化
  const switch_title = () => {
    return showMemo ? '詳細閉じる' : '詳細確認'
  }
  //switchの色を変更する
  const switch_style = () => {
    return showMemo ? `${styles.list_switch} ${styles.blue}` : `${styles.list_switch}`
  }

  // deleteを送信する非同期関数　premiseを返す
  async function DeleteTask(id) {
    const delete_url = `${TasksUrl}/${id}`
    const res = await fetch(delete_url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${Auth.getToken()}`
      }
    })
    const data = await res.json();
    return data;
  }

  // eventを削除する一連の関数
  const handleDelete = (id) => {
    DeleteTask(id)
      .then(data => {
        console.log(data);
        mutate(TasksUrl);
      })
      .catch(err => {
        console.log(err);
      })
  }

  // taskを変更する一連の関数 promiseを返す
  async function ChangeTask(id) {
    const target_url = `${TasksUrl}/change/${id}`
    const res = await fetch(target_url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${Auth.getToken()}`
      }
    })
    const data = await res.json();
    return data;
  }

  //taskの切り替えボタンの関数 id: integer
  const handleChange = (id) => {
    ChangeTask(id)
      .then(data => {
        // console.log(data);
        mutate(TasksUrl);
      })
      .catch(err => {
        console.log(err);
      })
  }

  //taskバーの表示を簡略化  completed: boolean
  const task_line = (completed) => {
    if (completed) {
      return (<div className={`${styles.task_line} ${styles.blue}`}></div>)
    } else {
      return (<div className={`${styles.task_line} ${styles.red}`}></div>)
    }
  }

  return (
    <div className={each_style()}>
      {task_line(props.completed)}
      {/* <button className={styles.change_button} onClick={() => handleChange(props.id)}>切り替え</button> */}
      <div>
        <span className={styles.list_date}>{props.date}日</span>
        <button className={switch_style()} onClick={() => setShowMemo(!showMemo)}>{switch_title()}</button>
        <button className={styles.change_button} onClick={() => handleChange(props.id)}>切り替え</button>
        <button className={styles.delete_button} onClick={() => handleDelete(props.id)}>削除</button>
        <br />{props.title}
        <br />
        {showMemo && (
          <div className={styles.memo}>
            <h3>メモ内容</h3>
            <p>{props.memo}</p>
          </div>
        )}
      </div>
    </div>
  )
}
