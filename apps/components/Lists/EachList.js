import React, { useState } from 'react'
import styles from './EventList.module.css'

//{ props: date:integer,title:string, memo:text}
export const EachList = (props) => {
  //memo情報を表示するか決定
  const [showMemo, setShowMemo] = useState(false);
  const each_style = () => {
    // if (showMemo) {
    //   return `${styles.list_each} ${styles.longer}`
    // } else {
    //   return `${styles.list_each}`
    // }
    return showMemo ? `${styles.list_each} ${styles.longer}` : `${styles.list_each}`
  }

  return (
    <div className={each_style()}>
      <span className={styles.list_date}>{props.date}日</span>{showMemo ? <button className={styles.list_switch} onClick={() => setShowMemo(false)}>詳細閉じる</button> : <button className={styles.list_switch} onClick={() => setShowMemo(true)}>詳細確認</button>}
      <br />{props.title}
      {/* 内容を表示するボタン */}
      <br />

      {showMemo && (
        <>
          <h3 className={styles.memo_title}>メモ内容</h3>
          <p>{props.memo}</p>
        </>
      )}
    </div>
  )
}
