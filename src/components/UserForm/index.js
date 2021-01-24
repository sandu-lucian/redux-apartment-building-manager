import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";

import { createUser } from "../../redux/actions";

const initialState = {
  name: "",
  age: "",
  isAssigned: false,
};

const UserForm = (props) => {
  const [formData, setFormData] = useState(initialState);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.createUser(formData.name, formData.age, formData.isAssigned);
    setFormData({ ...initialState });
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

export default connect(null, { createUser })(UserForm);
