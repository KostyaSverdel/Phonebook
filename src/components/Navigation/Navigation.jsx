import { React } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from 'Hooks/useAuth';

function Navigation() {
  const { isLogin } = useAuth();

  return (
    !isLogin && (
      <div>
        <ul>
          <li>
            <NavLink to="/register">Sign Up</NavLink>
          </li>
          <li>
            <NavLink to="/login">Log In</NavLink>
          </li>
        </ul>
      </div>
    )
  );
}

export default Navigation;
