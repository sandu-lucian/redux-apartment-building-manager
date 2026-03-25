import React from "react";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";

import UserList from "./UserList";
import UserForm from "./UserForm";
import Block from "./Block";
import MoveForm from "./MoveForm";

const App = () => {
  return (
    <Container>
      <Grid container>
        <Grid
          item
          container
          direction="column"
          justifyContent="space-evenly"
          xs
        >
          <Grid item>
            <UserList />
          </Grid>
          <Grid item>
            <UserForm />
          </Grid>
        </Grid>

        <Grid item container xs={6}>
          <Block />
        </Grid>

        <Grid
          item
          container
          direction="column"
          justifyContent="space-evenly"
          xs
        >
          <MoveForm />
        </Grid>
      </Grid>
    </Container>
  );
};

export default App;
