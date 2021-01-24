import { constants } from "../../constants";

export const createUser = (name, age, isAssigned) => {
  return {
    type: constants.CREATE_USER,
    payload: { name, age, isAssigned },
  };
};

export const moveUser = (name) => {
  return {
    type: constants.MOVE_USER,
    payload: { name },
  };
};

export const evacuateUsers = (users) => {
  return {
    type: constants.EVACUATE_USERS,
    payload: users,
  };
};

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
