import { constants } from "../constants";

export const usersReducer = (state = [], action) => {
  switch (action.type) {
    case constants.CREATE_USER:
      return [
        ...state,
        {
          name: action.payload.name,
          age: action.payload.age,
          isAssigned: action.payload.isAssigned,
        },
      ];

    case constants.MOVE_USER:
      const tempState = state;
      const x = tempState.find((us) => us.name === action.payload.name);
      x.isAssigned = true;
      return [...tempState];

    case constants.EVACUATE_USERS:
      const userList = state;
      action.payload.forEach((user) => {
        let x = userList.find((us) => us.name === user);
        x.isAssigned = false;
      });

      return [...userList];

    default:
      return state;
  }
};
