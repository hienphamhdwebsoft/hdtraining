import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../models/user';

export interface LoginPayload {
  username: string;
  password: string;
}

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
    login(state, action: PayloadAction<LoginPayload>) {
      state.logging = true;
    },

    loginSuccess(state, action: PayloadAction<User>) {
      state.logging = false;
      state.isLoggedIn = true;
      state.currentUser = action.payload;
    }, // <userInfo>

    loginFailed(state, action: PayloadAction<string>) {
      state.logging = false;
    }, // <Error>

    // Logout -> Non-callApi
    logout(state) {
      state.isLoggedIn = false;
      state.currentUser = undefined;
    },
  },
});

// Export Actions,
export const authActions = authSlice.actions;

// Export Selectors
export const selectIsLoggedIn = (state: any) => state.auth.isLoggedIn;
export const selectIsLogging = (state: any) => state.auth.logging;

// Export Reducer
const authReducer = authSlice.reducer;
export default authReducer;
