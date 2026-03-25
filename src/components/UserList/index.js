import React from "react";
import Grid from "@mui/material/Grid";
import { useSelector } from "react-redux";

import { selectUsers } from "../../state/usersSlice";
import UserData from "./UserData";

const UserList = () => {
  const users = useSelector(selectUsers);

  return (
    <Grid container direction="column" alignItems="center" spacing={3}>
      <Grid item>
        <h2>Locatari</h2>
      </Grid>
      <Grid item>
        <ol>
          {users.map((user) => (
            <UserData user={user} key={user.name} />
          ))}
        </ol>
      </Grid>
    </Grid>
  );
};

export default UserList;
