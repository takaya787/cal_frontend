import React, { useState } from "react";
import styles from './Modal.module.css';
//components
import { UserForm } from './Forms/UserForm';
import { LoginForm } from './Forms/LoginForm';

export function Modal() {
  const [isSignup, setIsSignup] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  //formの開け締めを管理する
  const [isOpen, setIsOpen] = useState(false);
  const Closemodal = () => {
    setIsSignup(false);
    setIsLogin(false);
    setIsOpen(false);
  }
  const Signupcontroll = () => {
    setIsSignup(!isSignup);
    setIsLogin(false);
    setIsOpen(true);
  }
  const Logincontroll = () => {
    setIsSignup(false);
    setIsLogin(!isLogin);
    setIsOpen(true);
  }
  return (
    <>{/* 始めはボタンが表示される */}
      { !isOpen &&
        (<button onClick={Signupcontroll} className={styles.initial}>カレンダーを始める！</button>)
      }

      {/* Sign up用のformが表示される */}
      { isOpen &&
        (<div className={styles.modal}>
          <div className={styles.content}>
            <button className={styles.content_close} onClick={Closemodal}>×</button>
            {/* signup用のformが表示される */}
            {isSignup && (
              <>
                <h2 className={styles.content_title}>ユーザー登録！</h2>
                <UserForm />
                <button className={styles.content_switch} onClick={Logincontroll}>ログインはこちら</button>
              </>
            )}
            {/* Login用のformが表示される */}
            {isLogin && (
              <>
                <h2 className={styles.content_title}>Log inはこちら！</h2>
                <LoginForm />
                <button className={styles.content_switch} onClick={Signupcontroll}>ユーザー登録はこちら</button>
              </>
            )}
          </div>
        </div>
        )
      }
    </>
  )
}
