import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  const signOut = async () => {
    try {
      // const response = await api.post('/logout');
      // console.log(response);
      // setAuth({});
      navigate('/login');
      // if (response?.data && response?.data.logout.__typename === 'Logout') {
      //   setAuth({});
      //   console.log(response?.data.logout.message);
      //   navigate('/login');
      // } else if (response?.data && response?.data.logout.__typename === 'AuthError') {
      //   console.log(response?.data.logout.message);
      // }
    } catch (err: any) {
      console.log(err);
    }
  };

  return (
    <button type="button" className="flex w-40 btn-primary justify-evenly" onClick={signOut}>
      Sign Out{' '}
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path
          fillRule="evenodd"
          d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
          clipRule="evenodd"
        ></path>
      </svg>
    </button>
  );
};

export default Logout;
