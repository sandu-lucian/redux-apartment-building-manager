import { constants } from "../constants";

export const createFloor = () => {
  return {
    type: constants.CREATE_FLOOR,
  };
};

export const deleteFloor = () => {
  return {
    type: constants.DELETE_FLOOR,
  };
};

export const fillApartment = (user, apartment) => {
  return {
    type: constants.FILL_APARTMENT,
    payload: { user, apartment },
  };
};
