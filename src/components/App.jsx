import { Route, Routes } from 'react-router-dom';
import LoginForm from 'pages/LoginForm/LoginForm';
import RegisterForm from 'pages/RegisterForm/RegisterForm';
import Layout from './Layout/Layout';
import { PrivateRoute } from './PrivateRoute';
import ContactsPage from 'pages/ContactsPage/ContactsPage';
import { RestrictedRoute } from './RestrictedRoute';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            path="/register"
            element={
              <RestrictedRoute
                component={<RegisterForm />}
                redirectTo="/contacts"
              />
            }
          />
          <Route
            path="/login"
            element={
              <RestrictedRoute
                component={<LoginForm />}
                redirectTo="/contacts"
              />
            }
          />
          <Route
            path="/contacts"
            element={
              <PrivateRoute component={<ContactsPage />} redirectTo="/" />
            }
          />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
