import { useSelector } from 'react-redux';
import { selectCurrentRole, selectCurrentToken } from '@/features/auth/authSlice';
import { Link } from 'react-router-dom';

const Welcome = () => {
  const token = useSelector(selectCurrentToken);
  const role = useSelector(selectCurrentRole);
  console.log(token);
  return (
    <section>
      <h1>Welcome {role}</h1>
      <Link to="/">Home</Link>
      <Link to="/login">Login</Link>
      <Link to="/users">Users</Link>
    </section>
  );
};

export default Welcome;
