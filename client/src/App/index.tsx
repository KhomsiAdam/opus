import { Routes, Route, Outlet } from 'react-router-dom';
// Auth and roles
import { PersistLogin } from '@/features/auth/PersistLogin';
import { RequireAuth } from '@/features/auth/RequireAuth';
import { Roles } from './constants/roles';

// Pages
import Login from '@/App/pages/Login';
import Register from '@/App/pages/Register';
import Unauthorized from '@/App/pages/Unauthorized';
import NotFound from '@/App/pages/NotFound';
import Home from '@/App/pages/Home';
import Admin from '@/App/pages/Admin';
import User from '@/App/pages/User';
import Welcome from '@/App/pages/Welcome';

const App = () => {

  return (
    <Routes>
      <Route path="/*" element={<Outlet />}>
        {/* public routes */}
        <Route path='board/*' element={<Home /> } />
        <Route path="login" element={<Login />} />
        {/* <Route path="register" element={<Register />} /> */}
        <Route path="unauthorized" element={<Unauthorized />} />
        {/* private routes */}
        <Route element={<PersistLogin />}>
          {/* <Route element={<RequireAuth allowedRoles={[Roles.ADMIN, Roles.USER]} />}>
          <Route path="/" element={<Home />} />
        </Route> */}
          <Route element={<RequireAuth allowedRoles={[Roles.ADMIN, Roles.USER]} />}>
            <Route path="welcome" element={<Welcome />} />
          </Route>
          <Route element={<RequireAuth allowedRoles={[Roles.ADMIN]} />}>
            <Route path="admin" element={<Admin />} />
          </Route>
          <Route element={<RequireAuth allowedRoles={[Roles.USER]} />}>
            <Route path="user" element={<User />} />
          </Route>
        </Route>
      </Route>
      {/* not found */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
