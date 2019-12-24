import React, { useState } from "react";
import { Grid, Typography, TextField, Button } from "@material-ui/core";
import { useCreateSizeMutation } from "../generated/graphql";

const CreateSizePage = () => {
  const [name, setName] = useState<string>("");

  const [createSizeMutation] = useCreateSizeMutation({
    variables: { name: name }
  });

  return (
    <form onSubmit={e => createSizeMutation()}>
      <Typography variant="h6" gutterBottom>
        Size Creation
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            required
            id="name"
            name="name"
            value={name}
            label="Enter size name"
            onChange={e => setName(e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="primary" type="submit">
            Create size
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default CreateSizePage;
