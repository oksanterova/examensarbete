import React, { useState } from "react";
import { Grid, Typography, TextField, Button } from "@material-ui/core";
import { useCreateCategoryMutation } from "../generated/graphql";
import StyledMain from "../components/StyledMain";

const CreateCategoryPage = () => {
  const [name, setName] = useState<string>("");

  const [createCategoryMutation] = useCreateCategoryMutation({
    variables: { name: name }
  });

  return (
    <StyledMain>
      <form onSubmit={e => createCategoryMutation()}>
        <Typography variant="h6" gutterBottom>
          Category Creation
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              required
              id="name"
              name="name"
              value={name}
              label="Enter category name"
              onChange={e => setName(e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" type="submit">
              Create category
            </Button>
          </Grid>
        </Grid>
      </form>
    </StyledMain>
  );
};

export default CreateCategoryPage;
