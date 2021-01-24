import React, { useState, useEffect } from "react";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { moveUser, fillApartment } from "../../redux/actions";

const MoveForm = (props) => {
  const [selectedUser, setSelectedUser] = useState("");
  const [selectedApartment, setSelectedApartment] = useState("");

  const [unassignedUsers, setUnassignedUsers] = useState([]);
  const [unusedApartments, setUnusedApartments] = useState([]);

  useEffect(() => {
    const notUsedAps = props.apartments.filter((ap) => ap.occupied === false);

    setUnusedApartments([...notUsedAps]);

    const notAssignedUsers = props.users.filter(
      (user) => user.isAssigned === false
    );

    setUnassignedUsers([...notAssignedUsers]);
  }, [props.apartments, props.users]);

  const handleSubmit = (e) => {
    console.log(props);
    e.preventDefault();
    const userToMove = props.users.find((user) => user.name === selectedUser);
    props.moveUser(selectedUser);
    props.fillApartment(userToMove, selectedApartment);

    setSelectedUser("");
    setSelectedApartment("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid
        container
        direction="column"
        justify="space-evenly"
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
              {unassignedUsers.map((user, index) => {
                return (
                  <MenuItem value={user.name} key={index}>
                    {user.name}
                  </MenuItem>
                );
              })}
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
              {unusedApartments.map((apt, index) => {
                return (
                  <MenuItem value={apt.name} key={index}>
                    {apt.name}
                  </MenuItem>
                );
              })}
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

const mapStateToProps = (state) => {
  return {
    users: state.users,
    apartments: state.apartments,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ moveUser, fillApartment }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(MoveForm);
