import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import styles from './EventForm.module.css'
import Auth from '../../modules/auth'
//propsでdateを受け取る予定
const endpoint = process.env.API_ENDPOINT + 'events'

//props {date: date, setIsEventForm(bool): void}
export const EventFrom = (props) => {
  const { register, handleSubmit, formstate } = useForm();

  const onSubmit = (value) => {
    // console.log(value);
    // console.log(props.date);
    fetch(endpoint, {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${Auth.getToken()}`
      },
      body: JSON.stringify({
        event: {
          title: value.title,
          memo: value.memo,
          //日付が一日ずれるので + 1しないといけない
          year: props.date.getFullYear(),
          month: props.date.getMonth() + 1,
          date: props.date.getDate(),
        },
      }),
    })
      //まだresponseを表示する実装しかしていない
      .then(response => response.json())
      .then(data => {
        console.log(data);
        //送信後にformを閉じる
        props.setIsEventForm(false)
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }
  //target_dateにはDate Objecy
  //曜日を作成
  const day_label = (target_date) => {
    let day = ''
    switch (target_date.getDay()) {
      case 0:
        day = '(日)'
        break
      case 1:
        day = '(月)'
        break;
      case 2:
        day = '(火)'
        break;
      case 3:
        day = '(水)'
        break;
      case 4:
        day = '(木)'
        break;
      case 5:
        day = '(金)'
        break;
      default:
        day = '(土)'
    }
    return (<>{day}</>)
  }

  //target_dateにはDate Objecy
  //getMonth()は0~11なので、+1必要
  const date_label = (target_date) => {
    return (
      <>
        登録日： { target_date.getFullYear()}年 { target_date.getMonth() + 1}月{ target_date.getDate()}日
      </>
    )
  }

  return (
    <div className={styles.draft}>
      <form
        className={styles.form}
        onSubmit={handleSubmit(onSubmit)}
      >
        <button className={styles.button} onClick={() => { props.setIsEventForm(false) }}>✕</button>
        <h3 className={styles.form_title}>予定を登録</h3>
        <label className={styles.form_label}>  {date_label(props.date)} {day_label(props.date)}
        </label>
        <label className={styles.form_label} htmlFor="title">タイトル<span className="required">＊必須</span></label>
        <input type="input" name="title" id="title"
          className={styles.form_input}
          ref={register({ required: 'タイトルは必須です' })}
        />

        <label htmlFor="memo" className={styles.form_label}>メモ</label>
        <textarea name="memo" id="memo" className={`${styles.form_input} ${styles.textarea}`} ref={register()} placeholder="メモはご自由に入力してください" />

        <input type="submit" value="予定を送信" className={styles.form_submit} />
      </form>
    </div>
  )
}
