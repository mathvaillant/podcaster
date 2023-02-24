import React from "react";

// Components
import PodcastCard from "./../PodcastCard/PodcastCard";

// Mui
import { Grid } from "@mui/material";

// Types
import { IPodCast } from "/@/Types/Podcast";

interface Props {
  podcasts?: IPodCast[];
}

const PodcastsContainer: React.FC<Props> = ({ podcasts = [] }) => {
  return (
    <Grid
      container
      display="flex"
      justifyContent="center"
      data-cy="podcasts_container"
    >
      {podcasts.map((podcast, index) => {
        return (
          <Grid xs={3} key={index} data-cy="podcast-card">
            <PodcastCard podcast={podcast} />
          </Grid>
        );
      })}
    </Grid>
  );
};

export default PodcastsContainer;
