import { Link } from 'react-router-dom';

const User = () => {
  return (
    <section>
      <h1>Users Page</h1>
      <br />
      <p>You must have an User role.</p>
      <br />
      <div>
        <Link to="/welcome">Welcome</Link>
      </div>
    </section>
  );
}

export default User;