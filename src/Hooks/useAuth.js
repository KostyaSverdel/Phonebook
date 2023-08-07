import { useSelector } from 'react-redux';
import {
  selectIsLogin,
  selectIsRefreshing,
  selectLoginError,
  selectUser,
} from '../redux/authentication/authSelectors';

export const useAuth = () => {
  const isLogin = useSelector(selectIsLogin);
  const user = useSelector(selectUser);
  const isRefresh = useSelector(selectIsRefreshing);
  const loginError = useSelector(selectLoginError);

  return {
    isLogin,
    user,
    isRefresh,
    loginError,
  };
};