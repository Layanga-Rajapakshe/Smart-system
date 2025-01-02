import { createSlice } from "@reduxjs/toolkit";

const getStoredUserInfo = () => {
  const userInfo = localStorage.getItem("userInfo");
  const expirationTime = localStorage.getItem("expirationTime");

  if (userInfo && expirationTime) {
    const currentTime = new Date().getTime();
    if (currentTime < parseInt(expirationTime, 10)) {
      return JSON.parse(userInfo);
    } else {
      // Clear expired data
      localStorage.removeItem("userInfo");
      localStorage.removeItem("expirationTime");
    }
  }
  return null;
};

const initialState = {
  userInfo: getStoredUserInfo(),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const expirationTime = new Date().getTime() + 15 * 24 * 60 * 60 * 1000; // 15 days

      state.userInfo = action.payload;
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
      localStorage.setItem("expirationTime", expirationTime.toString());
    },
    logout: (state) => {
      state.userInfo = null;
      localStorage.removeItem("userInfo");
      localStorage.removeItem("expirationTime");
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;
  