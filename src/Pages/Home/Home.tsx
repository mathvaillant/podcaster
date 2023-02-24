// Base
import React, { useState } from "react";
import { Await, useLoaderData, Outlet } from "react-router-dom";

// Components
import PodcastsContainer from "/@/Components/PodcastsContainer/PodcastsContainer";
import Header from "/@/Components/Header/Header";
import NotFound from "../NotFound";

// MUI
import { Grid, TextField, Typography } from "@mui/material";

// Styles
import useStyles from "./styles";

// Layouts
import PageLayout from "/@/Layouts/PageLayout";

interface IHomeLoader {
  podcasts: [];
}

export default function Home() {
  const { classes } = useStyles();
  const { podcasts } = useLoaderData() as IHomeLoader;

  const [filterValue, setFilterValue] = useState("");

  const filteredData = podcasts.filter((podcast: any) => {
    if (
      podcast["im:name"].label.toLowerCase().includes(filterValue) ||
      podcast["im:artist"].label.toLowerCase().includes(filterValue)
    )
      return true;
    return false;
  });

  const renderPodcastsCards = () => {
    return <PodcastsContainer podcasts={filteredData} />;
  };

  const handleFilter = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setFilterValue(e.target.value);

  return (
    <PageLayout>
      <Header />
      <Grid container flexDirection="column" gap={6}>
        <Grid
          xs={12}
          display="flex"
          flexDirection="row"
          alignSelf="flex-end"
          justifyContent="center"
          alignItems="center"
        >
          <span className={classes.span} data-cy="badge">
            <Typography>{filteredData.length}</Typography>
          </span>
          <TextField
            variant="outlined"
            size="small"
            placeholder="Filter podcasts"
            data-cy="filter_podcasts"
            onChange={handleFilter}
          />
        </Grid>
        <Grid xs={12}>
          <Await
            resolve={podcasts}
            errorElement={<NotFound />}
            children={renderPodcastsCards}
          />
        </Grid>
      </Grid>
      <Outlet />
    </PageLayout>
  );
}
