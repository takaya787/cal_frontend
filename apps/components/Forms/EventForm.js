import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import styles from './EventForm.module.css'

//propsでdateを受け取る予定
export const EventFrom = (props) => {
  const { register, handleSubmit, formstate } = useForm();

  const onSubmit = (value) => {
    console.log(value);
    console.log(props.date);
    //form閉じる
    props.setIsEventForm(false)
    // fetch(baseUrl, {
    //   method: 'POST', // or 'PUT'
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Authorization': `Bearer ${Auth.getToken()}`
    //   },
    //   body: JSON.stringify({
    //     event: {
    //       title: value.title,
    //       memo: value.memo,
    //     },
    //     date: props.date,
    //   }),
    // })
    //   .then(response => response.json())
    //   .then(data => {
    //     console.log(data);
    //   })
    //   .catch((error) => {
    //     console.error('Error:', error);
    //   });
  }
  //target_dateにはDate Objecy
  const date_label = (target_date) => {
    return (
      <>
        登録日： { props.date.getFullYear()}年 { props.date.getMonth()}月 { props.date.getDate()}日
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
        <label className={styles.form_label}>{date_label(props.date)}</label>
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
