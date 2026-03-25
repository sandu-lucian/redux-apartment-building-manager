import React from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import { useSelector, useDispatch } from "react-redux";

import {
  selectApartments,
  createFloor,
  deleteFloor,
  MAX_APARTMENTS,
} from "../../state/apartmentsSlice";
import { evacuateUsers } from "../../state/usersSlice";
import Apartment from "./Apartment";
import "./styles.scss";

const Block = () => {
  const dispatch = useDispatch();
  const apartments = useSelector(selectApartments);

  const handleCreateFloor = () => {
    if (apartments.length >= MAX_APARTMENTS) {
      alert("Nu poti crea mai mult de 10 apartamente!");
      return;
    }
    dispatch(createFloor());
  };

  const handleDeleteFloor = () => {
    if (apartments.length === 0) {
      alert("Nu exista apartamente!");
      return;
    }
    const apsToDelete = apartments.slice(apartments.length - 2);
    const usersToEvacuate = apsToDelete
      .filter((ap) => ap.occupied)
      .map((ap) => ap.tenant.name);

    if (usersToEvacuate.length > 0) {
      dispatch(evacuateUsers(usersToEvacuate));
    }
    dispatch(deleteFloor());
  };

  return (
    <Grid
      container
      direction="column"
      justifyContent="space-between"
      alignItems="center"
      spacing={4}
    >
      <Grid
        item
        container
        direction="row"
        justifyContent="space-evenly"
        alignItems="center"
      >
        <Grid item>
          <Button onClick={handleCreateFloor}>Creeaza un nou etaj</Button>
        </Grid>
        <Grid item>
          <Button onClick={handleDeleteFloor}>Sterge un etaj</Button>
        </Grid>
      </Grid>
      <Grid item>
        <Paper elevation={3} className="block">
          {apartments.map((ap) => (
            <Apartment
              key={ap.id}
              number={ap.name}
              isOccupied={ap.occupied}
              tenant={ap.tenant}
            />
          ))}
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Block;
