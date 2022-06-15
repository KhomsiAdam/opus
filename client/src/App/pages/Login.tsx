import { useState, useEffect } from 'react';
import { useNavigate, useLocation, To } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { setCredentials, setPersist, selectPersistStatus } from '@/features/auth/authSlice';
import { useLoginMutation } from '@/features/auth/authApiSlice';

import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Input } from '@/shared/components/Input';
import { Spinner } from '@/shared/components/Spinner';
import SEO from '@/shared/components/SEO';
import storage from '@/shared/helpers/storage';

interface LoginFormInputs {
  email: string;
  password: string;
}

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

type LocationStateInterface = {
  from: {
    pathname: string;
  };
};

const Login = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [loginMutation, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();
  const persist = useSelector(selectPersistStatus);

  const navigate = useNavigate();
  const location = useLocation();

  let fromLocation: To = '/';

  if (location.state) {
    const { from } = (location?.state as LocationStateInterface) || '/';
    fromLocation = from?.pathname || '/';
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: yupResolver(schema),
  });

  const togglePersist = () => {
    setIsChecked((prev: boolean) => !prev);
  };

  useEffect(() => {
    if (isChecked) dispatch(setPersist({ persist: 'true' }));
    if (!isChecked) dispatch(setPersist({ persist: 'false' }));
    storage.set('persist', persist);
  }, [isChecked, persist]);
  // useEffect(() => {
  //   emailRef.current.focus();
  // }, []);

  const onSubmit: SubmitHandler<LoginFormInputs> = async (formInputData) => {
    try {
      const response = await loginMutation(formInputData).unwrap();
      const { token, role } = response;
      dispatch(setCredentials({ token, role }));
      navigate(fromLocation, { replace: true });
    } catch (err: any) {
      console.log(err);
    }
  };

  return (
    <>
      <SEO url="/login" title="Login" />
      <div className="container flex flex-col justify-center h-screen max-w-lg mx-auto">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            inputName="email"
            inputType="email"
            placeholderText="admin@email.com"
            labelText="Email"
            errorMessage={errors.email?.message}
            inputValidation={register('email')}
          />
          <Input
            inputName="password"
            inputType="text"
            placeholderText="admin123**"
            labelText="Password"
            errorMessage={errors.password?.message}
            inputValidation={register('password')}
          />
          <div className="flex items-center mr-3">
            <input
              id="persist"
              type="checkbox"
              className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-400 focus:ring-primary-500 dark:focus:ring-primary-500 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              onChange={togglePersist}
              checked={isChecked}
            />
            <label htmlFor="persist" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
              Remember me
            </label>
          </div>
          <div className="flex justify-end">
            <button
              // disabled={loading && true}
              className={`relative w-full py-3 mt-4 text-lg select-none btn-primary`}
              // className={`relative w-full py-3 mt-4 text-lg select-none btn-primary ${loading && 'opacity-90'}`}
            >
              {isLoading && (
                <Spinner
                  spinningColor="text-secondary-500"
                  bgColor="fill-primary-700"
                  size="8"
                  classNames="absolute left-3 top-[50%] translate-y-[-50%]"
                />
              )}
              {isLoading ? 'Submitting...' : 'Sign in'}
            </button>
          </div>
          {/* <p className="my-3 text-lg font-medium text-center text-red-500">
          {errorMessage}
        </p> */}
        </form>
        {/* <p className="my-2 text-center">
        Not having an Account?
        <br />
        <span className="line">
          <Link to="/register" className="text-blue-500 hover:underline">
            Sign Up
          </Link>
        </span>
      </p> */}
      </div>
    </>
  );
};

export default Login;
