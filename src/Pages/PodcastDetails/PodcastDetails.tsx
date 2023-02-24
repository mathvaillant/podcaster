// Base
import { Outlet, useLoaderData } from "react-router-dom";

// Styles
import useStyles from "./styles";

// Layouts
import PageLayout from "/@/Layouts/PageLayout";

// MUI
import { Box, Card, Divider, Grid, Typography } from "@mui/material";

// Types
import { IPodCast } from "/@/Types/Podcast";

interface ILoaderData {
  podcast: IPodCast;
}

export default function PodcastDetails() {
  const { classes } = useStyles();
  const { podcast } = useLoaderData() as ILoaderData;

  const imageUrl = podcast["im:image"].at(-1).label;
  const podcastName = podcast["im:name"].label;
  const artist = podcast["im:artist"].label;
  const description = podcast["summary"].label;

  return (
    <PageLayout>
      <Grid container className={classes.root}>
        <Grid xs={3}>
          <Card
            elevation={3}
            className={classes.leftCard}
            data-cy="details_left_card"
          >
            <Box className={classes.imgWrapper} data-cy="details_left_card_img">
              <img src={imageUrl} alt={podcastName} className={classes.img} />
            </Box>
            <Divider />
            <Box>
              <Typography
                variant="subtitle2"
                data-cy="details_left_card_artist"
              >
                {artist}
              </Typography>
              <Typography variant="body2" data-cy="details_left_card_name">
                By {podcastName}
              </Typography>
            </Box>
            <Divider />
            {description && (
              <Box>
                <Typography variant="subtitle2">Description:</Typography>
                <Typography variant="body2">{description}</Typography>
              </Box>
            )}
          </Card>
        </Grid>
        <Grid xs={9}>
          <Outlet />
        </Grid>
      </Grid>
    </PageLayout>
  );
}
