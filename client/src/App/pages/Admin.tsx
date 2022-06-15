import { Link } from 'react-router-dom';

const Admin = () => {
  return (
    <section>
      <h1>Admins Page</h1>
      <br />
      <p>You must have an Admin role.</p>
      <br />
      <div>
        <Link to="/welcome">Home</Link>
      </div>
    </section>
  );
}

export default Admin;