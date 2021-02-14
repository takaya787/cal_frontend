import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import Auth from '../../modules/auth'
//contexts
import { UserContext } from '../../pages/_app';
import styles from './UserForm.module.css';

const endpoint = process.env.API_ENDPOINT + 'login'

export function LoginForm() {
  const router = useRouter();

  //_appからcontextsを受け取る
  const { setUser } = useContext(UserContext);

  const { register, handleSubmit } = useForm();

  const onSubmit = (value) => {
    // console.log(value.title);
    fetch(endpoint, {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: value.email,
        password: value.password,
      }),
    })
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          // console.log(data.error);
          alert(data.error);
          return
        }
        console.log("Logined successfully");
        Auth.login(data.token);
        const user_data = data.user
        setUser({ email: user_data.email, id: user_data.id, name: user_data.name });
        // router.push('/reviews/new');
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }
  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <label className={styles.label} htmlFor="email">Eメール</label>
      <input
        className={styles.form_input}
        id="email"
        name="email"
        type="email"
        ref={register({ required: 'emailは必須です' })}
      />
      <label className={styles.label} htmlFor="password">パスワード</label>
      <input
        className={styles.form_input}
        id="password"
        type="password"
        name="password"
        ref={register({ required: 'passwordは必須です' })}
      />
      <button type="submit" className={styles.form_submit}>ログインする</button>
    </form>
  )
}
