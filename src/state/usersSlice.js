import { createSlice } from "@reduxjs/toolkit";

const usersSlice = createSlice({
  name: "users",
  initialState: [],
  reducers: {
    createUser: {
      reducer(state, action) {
        state.push(action.payload);
      },
      prepare(name, age) {
        return { payload: { name, age, isAssigned: false } };
      },
    },
    moveUser(state, action) {
      const user = state.find((u) => u.name === action.payload);
      if (user) {
        user.isAssigned = true;
      }
    },
    evacuateUsers(state, action) {
      action.payload.forEach((name) => {
        const user = state.find((u) => u.name === name);
        if (user) {
          user.isAssigned = false;
        }
      });
    },
  },
});

export const { createUser, moveUser, evacuateUsers } = usersSlice.actions;

export const selectUsers = (state) => state.users;
export const selectUnassignedUsers = (state) =>
  state.users.filter((u) => !u.isAssigned);

export default usersSlice.reducer;
