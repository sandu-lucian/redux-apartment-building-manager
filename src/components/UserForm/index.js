import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useDispatch } from "react-redux";

import { createUser } from "../../state/usersSlice";

const initialState = {
  name: "",
  age: "",
};

const UserForm = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState(initialState);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createUser(formData.name, formData.age));
    setFormData(initialState);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container direction="column" alignItems="center" spacing={1}>
        <Grid item container>
          <TextField
            variant="filled"
            fullWidth
            label="Numele dvs."
            name="name"
            required
            onChange={handleChange}
            value={formData.name}
          />
        </Grid>
        <Grid item container>
          <TextField
            variant="filled"
            type="number"
            fullWidth
            label="Varsta dvs."
            name="age"
            required
            onChange={handleChange}
            value={formData.age}
          />
        </Grid>
        <Grid item container>
          <Button variant="contained" color="primary" fullWidth type="submit">
            Inregistreaza-te
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default UserForm;
