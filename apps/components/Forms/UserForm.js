import { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router'

import Auth from '../../modules/auth'

//mutateでkeyを元に更新できる
// import { mutate } from 'swr';
//contexts
import { UserContext } from '../../pages/_app';
import styles from './UserForm.module.css';

const endpoint = process.env.API_ENDPOINT + 'users'

export function UserForm() {
  const router = useRouter();

  const { register, handleSubmit, formstate } = useForm();
  const initialerrors = { name: '', email: '', password: '', password_confirmation: '' };

  //_appからcontextsを受け取る
  const { setUser } = useContext(UserContext);

  //errorを表示させるCustom Hooks
  const { errors, handleError, resetError } = useFormErrors(initialerrors);

  const onSubmit = (value) => {
    console.log('raw data')
    console.log(value);
    fetch(endpoint, {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user: {
          name: value.name,
          email: value.email,
          password: value.password,
          password_confirmation: value.password_confirmation
        }
      }),
    })
      .then(response => response.json())
      .then(data => {
        console.log('response data')
        console.log(data);
        if (data.errors) {
          console.log(data.errors);
          handleError(data.errors);
          return
        }
        // console.log(data.token);
        console.log('User is successfully created');
        //Login関連の処理 context使用
        Auth.login(data.token);
        const user_data = data.user
        setUser({ id: user_data.id, email: user_data.email, name: user_data.name });
        //Login関連の処理 終了
        resetError();
        // mutate(baseUrl);
        // router.push('/reviews/new');
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }
  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <label className={styles.label} htmlFor="name">お名前</label>
      <input
        className={styles.form_input}
        id="name"
        name="name"
        ref={register({ required: 'ユーザー名は必須です' })}
      />
      <label className={styles.label} htmlFor="email">Eメール</label>
      <input
        id="email"
        className={styles.form_input}
        name="email"
        type="email"
        ref={register({ required: 'emailは必須です' })}
      />
      {errors.email !== '' && (
        <p className={styles.form_error}>Email {errors.email}</p>
      )}
      <label className={styles.label} htmlFor="password">パスワード</label>
      <input
        id="password"
        className={styles.form_input}
        type="password"
        name="password"
        ref={register({ required: 'passwordは必須です' })}
      />
      {errors.password !== '' && (
        <p className={styles.form_error}>Password {errors.password}</p>
      )}
      <label
        className={styles.label}
        htmlFor="password_confirmation">
        パスワード確認用
      </label>
      <input
        id="password_confirmation"
        className={styles.form_input}
        type="password"
        name="password_confirmation"
        ref={register({ required: 'password_confirmationは必須です' })}
      />
      {errors.password_confirmation !== "" && (
        <p className={styles.form_error}>Password_confirmation {errors.password_confirmation}</p>
      )}
      <button type="submit" className={styles.form_submit}>登録する</button>
    </form>
  )
}


//railsのvalidateからerrorを受け取るためのcustom Hook
//formの要素ごとのkeyを設定して、各keyごとにerror messageを追加
export function useFormErrors(initialerrors) {
  // const initialerrors = { name: '', email: '', password: '', password_confirmation: '' };
  const [errors, setErrors] = useState(initialerrors);
  const handleError = (data) => {
    let errors_copy = Object.assign({}, initialerrors);
    Object.keys(data).forEach(
      function (key) {
        // console.log(key + ' =  ' + data[key]);
        errors_copy = { ...errors_copy, [key]: data[key][0] };
        setErrors(errors_copy);
      }
    )
  }
  const resetError = () => {
    setErrors(initialerrors);
  }

  return { errors, handleError, resetError }
}
