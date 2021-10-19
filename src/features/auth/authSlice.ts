import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../models/user';

export interface AuthState {
  isLoggedIn: boolean;
  logging?: boolean;
  currentUser?: User;
}

const initialState: AuthState = {
  isLoggedIn: false,
  logging: false,
  currentUser: undefined,
};

const authSlice = createSlice({
  name: 'auth',
  initialState, // Equal to const initialState: AuthState
  reducers: {
    //   Login -> callApi
    login(state, action: PayloadAction<string>) {},
    loginSuccess(state, action: PayloadAction<string>) {}, // <userInfo>
    loginFailed(state, action: PayloadAction<string>) {}, // <Error>

    // Logout -> Non-callApi
    logout(state) {},
  },
});

// Export Actions, Selectors, Reducer
export const authActions = authSlice.actions;
const authReducer = authSlice.reducer;
export default authReducer;
