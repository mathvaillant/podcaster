// Base
import React from "react";
import { Outlet } from "react-router-dom";

// Custom hooks
import useHome from "./Home.hook";

// Components
import PodcastsContainer from "/@/Components/PodcastsContainer/PodcastsContainer";
import Header from "/@/Components/Header/Header";

// MUI
import { Grid, TextField, Typography } from "@mui/material";

// Styles
import useStyles from "./styles";

// Layouts
import PageLayout from "/@/Layouts/PageLayout";

export default function Home() {
  const { classes } = useStyles();
  const { podcasts, handleFilter } = useHome();

  return (
    <PageLayout>
      <Header />
      <Grid container flexDirection="column" gap={6}>
        <Grid
          item
          xs={12}
          display="flex"
          flexDirection="row"
          alignSelf="flex-end"
          justifyContent="center"
          alignItems="center"
        >
          <span className={classes.span} data-testid="badge">
            <Typography>{podcasts.length}</Typography>
          </span>
          <TextField
            variant="outlined"
            size="small"
            placeholder="Filter podcasts"
            data-testid="filter-podcasts"
            onChange={handleFilter}
          />
        </Grid>
        <Grid item xs={12}>
          <PodcastsContainer podcasts={podcasts} />
        </Grid>
      </Grid>
      <Outlet />
    </PageLayout>
  );
}
