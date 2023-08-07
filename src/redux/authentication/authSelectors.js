export const selectUser = state => state.auth.user;
export const selectIsLogin = state => state.auth.isLoggedIn;
export const selectIsRefreshing = state => state.auth.isRefreshing;
export const selectLoginError = state => state.auth.loginError;