import apartmentsReducer, {
  createFloor,
  deleteFloor,
  fillApartment,
  selectAvailableApartments,
} from "../state/apartmentsSlice";

describe("apartmentsSlice", () => {
  it("should return the initial state", () => {
    expect(apartmentsReducer(undefined, { type: "@@init" })).toEqual([]);
  });

  it("createFloor adds 2 apartments", () => {
    const state = apartmentsReducer([], createFloor());
    expect(state).toHaveLength(2);
    expect(state[0].name).toBe("Apartamentul 1");
    expect(state[1].name).toBe("Apartamentul 2");
    expect(state[0].occupied).toBe(false);
  });

  it("createFloor does not exceed 10 apartments", () => {
    let state = [];
    for (let i = 0; i < 6; i++) {
      state = apartmentsReducer(state, createFloor());
    }
    expect(state).toHaveLength(10);
    const stateAfterExtra = apartmentsReducer(state, createFloor());
    expect(stateAfterExtra).toHaveLength(10);
  });

  it("deleteFloor removes the last 2 apartments", () => {
    let state = apartmentsReducer([], createFloor());
    state = apartmentsReducer(state, createFloor());
    expect(state).toHaveLength(4);
    state = apartmentsReducer(state, deleteFloor());
    expect(state).toHaveLength(2);
  });

  it("deleteFloor does nothing when there are no apartments", () => {
    const state = apartmentsReducer([], deleteFloor());
    expect(state).toHaveLength(0);
  });

  it("fillApartment marks apartment as occupied with the given tenant", () => {
    let state = apartmentsReducer([], createFloor());
    const apartmentName = state[0].name;
    state = apartmentsReducer(
      state,
      fillApartment({ user: { name: "Alice", age: "30", isAssigned: false }, apartment: apartmentName })
    );
    expect(state[0].occupied).toBe(true);
    expect(state[0].tenant.name).toBe("Alice");
  });

  it("selectAvailableApartments returns only unoccupied apartments", () => {
    let state = apartmentsReducer([], createFloor());
    const apartmentName = state[0].name;
    state = apartmentsReducer(
      state,
      fillApartment({ user: { name: "Alice" }, apartment: apartmentName })
    );
    const reduxState = { apartments: state };
    const available = selectAvailableApartments(reduxState);
    expect(available).toHaveLength(1);
    expect(available[0].name).toBe("Apartamentul 2");
  });
});
