import React from "react";
import Grid from "@material-ui/core/Grid";
import { connect } from "react-redux";

import UserData from "./UserData";

const UserList = ({ users }) => {
  const userList = users.map((user, index) => {
    return <UserData user={user} key={index} />;
  });

  return (
    <Grid container direction="column" alignItems="center" spacing={3}>
      <Grid item>
        <h2>Locatari</h2>
      </Grid>
      <Grid item>
        <ol>{userList}</ol>
      </Grid>
    </Grid>
  );
};

const mapStateToProps = (state) => {
  return {
    users: state.users,
  };
};

export default connect(mapStateToProps)(UserList);
