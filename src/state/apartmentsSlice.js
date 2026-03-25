import { createSlice, nanoid } from "@reduxjs/toolkit";

export const MAX_APARTMENTS = 10;

const emptyTenant = () => ({ name: "", age: "", isAssigned: false });

const apartmentsSlice = createSlice({
  name: "apartments",
  initialState: [],
  reducers: {
    createFloor(state) {
      if (state.length >= MAX_APARTMENTS) return;
      const nextIndex = state.length + 1;
      state.push(
        { id: nanoid(), name: `Apartamentul ${nextIndex}`, occupied: false, tenant: emptyTenant() },
        { id: nanoid(), name: `Apartamentul ${nextIndex + 1}`, occupied: false, tenant: emptyTenant() }
      );
    },
    deleteFloor(state) {
      if (state.length === 0) return;
      state.splice(state.length - 2, 2);
    },
    fillApartment(state, action) {
      const { user, apartment } = action.payload;
      const ap = state.find((a) => a.name === apartment);
      if (ap && !ap.occupied) {
        ap.occupied = true;
        ap.tenant = { ...user };
      }
    },
  },
});

export const { createFloor, deleteFloor, fillApartment } =
  apartmentsSlice.actions;

export const selectApartments = (state) => state.apartments;
export const selectAvailableApartments = (state) =>
  state.apartments.filter((a) => !a.occupied);

export default apartmentsSlice.reducer;
