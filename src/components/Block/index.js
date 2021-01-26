import React from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { createFloor, deleteFloor, evacuateUsers } from "../../redux/actions";
import Apartment from "./Apartment";
import "./styles.scss";

const Block = (props) => {
  const createNewFloor = () => {
    if (props.apartments.length < 10) {
      props.createFloor();
    } else {
      alert("Nu poti crea mai mult de 10 apartamente!");
    }
  };

  const deleteLastFloor = () => {
    if (props.apartments.length > 0) {
      const apsToDelete = props.apartments.slice(
        props.apartments.length - 2,
        props.apartments.length
      );
      const filledApsToEvacuate = apsToDelete.filter(
        (ap) => ap.user.isAssigned === true
      );

      let usersToEvacuate = [];
      for (let i = 0; i < filledApsToEvacuate.length; i++) {
        usersToEvacuate.push(filledApsToEvacuate[i].user.name);
      }

      console.log(
        "apsToDelete",
        apsToDelete,
        "filled",
        filledApsToEvacuate,
        "users",
        usersToEvacuate
      );

      props.evacuateUsers([...usersToEvacuate]);
      props.deleteFloor();
    } else {
      alert("Nu exista apartamente!");
    }
  };

  return (
    <Grid
      container
      direction="column"
      justify="space-between"
      alignItems="center"
      spacing={4}
    >
      <Grid
        item
        container
        direction="row"
        justify="space-evenly"
        alignItems="center"
      >
        <Grid item>
          <Button onClick={createNewFloor}>Creeaza un nou etaj</Button>
        </Grid>
        <Grid item>
          <Button onClick={deleteLastFloor}>Sterge un etaj</Button>
        </Grid>
      </Grid>
      <Grid item>
        <Paper elevation={3} className="block">
          {props.apartments.map((ap, index) => {
            return (
              <Apartment
                number={ap.name}
                isOccupied={ap.occupied}
                user={ap.user}
                key={index}
              />
            );
          })}
        </Paper>
      </Grid>
    </Grid>
  );
};

const mapStateToProps = (state) => {
  return { apartments: state.apartments };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    { createFloor, deleteFloor, evacuateUsers },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Block);
