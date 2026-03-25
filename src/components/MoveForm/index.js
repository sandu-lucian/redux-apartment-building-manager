import React, { useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { useSelector, useDispatch } from "react-redux";

import { selectUnassignedUsers, moveUser, selectUsers } from "../../state/usersSlice";
import {
  selectAvailableApartments,
  fillApartment,
} from "../../state/apartmentsSlice";

const MoveForm = () => {
  const dispatch = useDispatch();
  const [selectedUser, setSelectedUser] = useState("");
  const [selectedApartment, setSelectedApartment] = useState("");

  const unassignedUsers = useSelector(selectUnassignedUsers);
  const availableApartments = useSelector(selectAvailableApartments);
  const allUsers = useSelector(selectUsers);

  const handleSubmit = (e) => {
    e.preventDefault();
    const userToMove = allUsers.find((u) => u.name === selectedUser);
    dispatch(moveUser(selectedUser));
    dispatch(fillApartment({ user: userToMove, apartment: selectedApartment }));
    setSelectedUser("");
    setSelectedApartment("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid
        container
        direction="column"
        justifyContent="space-evenly"
        alignItems="center"
        spacing={1}
      >
        <Grid item container>
          <FormControl variant="filled" fullWidth>
            <InputLabel>Nume locatar fara apartament</InputLabel>
            <Select
              value={selectedUser}
              onChange={(e) => setSelectedUser(e.target.value)}
              required
            >
              {unassignedUsers.map((user) => (
                <MenuItem value={user.name} key={user.name}>
                  {user.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item container>
          <FormControl variant="filled" fullWidth>
            <InputLabel>Apartamente ramase disponibile</InputLabel>
            <Select
              value={selectedApartment}
              onChange={(e) => setSelectedApartment(e.target.value)}
              required
            >
              {availableApartments.map((apt) => (
                <MenuItem value={apt.name} key={apt.id}>
                  {apt.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item container>
          <Button variant="contained" color="primary" fullWidth type="submit">
            Muta in apartament
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default MoveForm;
