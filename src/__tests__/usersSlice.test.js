import usersReducer, {
  createUser,
  moveUser,
  evacuateUsers,
  selectUnassignedUsers,
} from "../state/usersSlice";

describe("usersSlice", () => {
  it("should return the initial state", () => {
    expect(usersReducer(undefined, { type: "@@init" })).toEqual([]);
  });

  it("createUser adds a user with isAssigned=false", () => {
    const state = usersReducer([], createUser("Alice", "30"));
    expect(state).toHaveLength(1);
    expect(state[0]).toEqual({ name: "Alice", age: "30", isAssigned: false });
  });

  it("moveUser sets isAssigned to true for the named user", () => {
    const initial = [{ name: "Alice", age: "30", isAssigned: false }];
    const state = usersReducer(initial, moveUser("Alice"));
    expect(state[0].isAssigned).toBe(true);
  });

  it("evacuateUsers sets isAssigned to false for the listed users", () => {
    const initial = [
      { name: "Alice", age: "30", isAssigned: true },
      { name: "Bob", age: "25", isAssigned: true },
    ];
    const state = usersReducer(initial, evacuateUsers(["Alice"]));
    expect(state[0].isAssigned).toBe(false);
    expect(state[1].isAssigned).toBe(true);
  });

  it("selectUnassignedUsers filters out assigned users", () => {
    const state = {
      users: [
        { name: "Alice", age: "30", isAssigned: false },
        { name: "Bob", age: "25", isAssigned: true },
      ],
    };
    expect(selectUnassignedUsers(state)).toHaveLength(1);
    expect(selectUnassignedUsers(state)[0].name).toBe("Alice");
  });
});
