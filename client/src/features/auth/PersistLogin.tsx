import { useState, useEffect } from 'react';
import Layout from '@/App/layout';
import { Spinner } from '@/shared/components/Spinner';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentToken, selectPersistStatus, setCredentials } from './authSlice';
import { useRefreshMutation } from './authApiSlice';

export const PersistLogin = () => {
  const [appIsLoading, setAppIsLoading] = useState(true);
  const currentToken = useSelector(selectCurrentToken);
  const persist = useSelector(selectPersistStatus);
  
  const dispatch = useDispatch();
  const [refreshMutation] = useRefreshMutation();

  const verifyRefreshToken = async () => {
    try {
      const response = await refreshMutation({}).unwrap();
      const { token, role } = response;
      dispatch(setCredentials({ token, role }));
      setAppIsLoading(false);
    } catch (err: any) {
      console.log(err);
    }
  };

  useEffect(() => {
    !currentToken ? verifyRefreshToken() : setAppIsLoading(false);
  }, []);

  return (
    <>
      {persist === 'false' ? (
        <Layout />
      ) : appIsLoading ? (
        <Spinner
          spinningColor="text-secondary-500"
          bgColor="fill-primary-500"
          size="24"
          classNames="grid place-content-center w-full h-screen"
        />
      ) : (
        <Layout />
      )}
    </>
  );
};
