import { constants } from "../constants";

export const apartmentsReducer = (state = [], action) => {
  switch (action.type) {
    case constants.CREATE_FLOOR:
      return [
        ...state,
        {
          name: `Apartamentul ${state.length + 1}`,
          occupied: false,
          user: { name: "", age: "", isAssigned: false },
        },
        {
          name: `Apartamentul ${state.length + 2}`,
          occupied: false,
          user: { name: "", age: "", isAssigned: false },
        },
      ];

    case constants.DELETE_FLOOR:
      return state.slice(0, state.length - 2);

    case constants.FILL_APARTMENT:
      const tempAp = state;
      const apartmentToFill = tempAp.find(
        (apt) => apt.name === action.payload.apartment
      );
      if (
        apartmentToFill !== undefined &&
        apartmentToFill.user.isAssigned === false
      ) {
        apartmentToFill.occupied = true;
        apartmentToFill.user = action.payload.user;
      }
      return [...tempAp];

    default:
      return state;
  }
};
