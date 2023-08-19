import { useLocation, useNavigate } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { getRouteLogin } from '../../routes/routes';

import styles from './Auth.module.scss';

interface AuthForm {
  nickname: string;
  password: string;
}

export const Auth = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<AuthForm>({
    defaultValues: {
      nickname: '',
      password: '',
    }
  });
  const isLogin = location.pathname === getRouteLogin();

  const onSubmit: SubmitHandler<AuthForm> = data => {
    console.log('onSubmit', data);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.authTitle}>{isLogin ? 'Login' : "Registration"}</h2>
      <form className={styles.formWrapper} onSubmit={handleSubmit(onSubmit)}>
      <label className={styles.formLabel}>
        nickname:
        <input type='text' className={styles.formInput} {...register('nickname')} />
      </label>
      <label className={styles.formLabel}>
        password:
        <input type='password' className={styles.formInput} {...register('password')} />
      </label>
      <button className={styles.submitButton} type="submit">SUBMIT</button>
    </form>
    </div>
  );
}
