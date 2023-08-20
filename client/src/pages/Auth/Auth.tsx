import { useLocation, useNavigate } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { getRouteLogin } from '../../routes/routes';

import styles from './Auth.module.scss';

interface AuthForm {
  nickname: string;
  password: string;
  avatar: FileList;
}

enum ErrorType {
  required = 'required',
  minLength = 'minLength',
}

const errorMessage = {
  [ErrorType.required]: (name: string) => `${name} is required`,
  [ErrorType.minLength]: (length: number) => `min length ${length}`,
}

export const Auth = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { 
    register, 
    handleSubmit, 
    watch,
    formState: { errors },
  } = useForm<AuthForm>({
    defaultValues: {
      nickname: '',
      password: '',
    },
    mode: 'onChange',
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
        <input 
          type='text' 
          className={styles.formInput} 
          placeholder='enter nickname'
          {...register('nickname', {required: true, minLength: 3})} 
        />
        <span className={styles.errorMessage}>
          {errors.nickname?.type === ErrorType.required && errorMessage[ErrorType.required]('nickname')}
          {errors.nickname?.type === ErrorType.minLength && errorMessage[ErrorType.minLength](3)}
        </span>
      </label>
      <label className={styles.formLabel}>
        password:
        <input 
          type='password' 
          className={styles.formInput}
          placeholder='enter password'
          {...register('password', {required: 'password is required', minLength: 5})} 
        />
        <span className={styles.errorMessage}>
          {errors.password?.type === ErrorType.required && errorMessage[ErrorType.required]('password')}
          {errors.password?.type === ErrorType.minLength && errorMessage[ErrorType.minLength](5)}
        </span>
      </label>
      <label className={styles.formLabel}>
        avatar:
        <input 
          type='file' 
          className={styles.hide} 
          {...register('avatar', {required: 'avatar is required'})} 
        />
        <div className={`${styles.formInput} ${styles.lineHeight}`} >
          {watch('avatar')?.[0]?.name
            ? (<span>{watch('avatar')[0].name}</span>)
            : (<span className={styles.fileName} >avatar.png</span>)
          }
        </div>
        <span className={styles.errorMessage}>
          {errors.avatar?.type === ErrorType.required && errorMessage[ErrorType.required]('avatar')}
        </span>
      </label>
      <button 
        className={styles.submitButton} 
        type="submit"
      >
        SUBMIT
      </button>
      {/* TEST ERRORS */}
      {/* <button className={styles.submitButton} type="button" onClick={() => console.log(errors)}>SUBMIT</button> */}
    </form>
    </div>
  );
}
