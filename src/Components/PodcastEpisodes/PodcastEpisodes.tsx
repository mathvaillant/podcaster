import React from "react";
import { useLoaderData, useNavigate } from "react-router-dom";

// MUI
import {
  Card,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from "@mui/material";

// Styles
import useStyles from "./styles";

// Utils
import { millisToMinutesAndSeconds } from "/@/Utils/time";

// Types
import { IEpisode } from "/@/Types/Podcast";

interface ILoaderData {
  episodes: IEpisode[];
}

const PodcastEpisodes = () => {
  const { classes } = useStyles();
  const navigate = useNavigate();
  const { episodes } = useLoaderData() as ILoaderData;

  const onClickEpisode = (episodeId: number) => {
    navigate(`episode/${episodeId}`);
  };

  return (
    <Grid xs={12} className={classes.root}>
      <Card elevation={3} className={classes.topCard}>
        <Typography
          variant="h5"
          className={classes.title}
          data-cy="episodes_title"
        >
          Episodes: {episodes.length}
        </Typography>
      </Card>
      <Card
        elevation={3}
        className={classes.bottomCard}
        data-cy="episodes_table"
      >
        <TableContainer component={Paper} className={classes.tablePaper}>
          <Table sx={{ width: "100%" }} size="small">
            <TableHead>
              <TableRow>
                <TableCell align="left">
                  <Typography className={classes.header} variant="subtitle1">
                    Title
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography className={classes.header} variant="subtitle1">
                    Date
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography className={classes.header} variant="subtitle1">
                    Duration
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {episodes.map(
                ({ trackName, trackTimeMillis, releaseDate, trackId }) => (
                  <TableRow
                    key={trackName}
                    data-cy="episodes_row"
                    sx={{
                      "&:nth-of-type(odd)": { backgroundColor: "#f9fcff" }
                    }}
                  >
                    <TableCell
                      component="th"
                      scope="row"
                      data-cy="episodes_track_name"
                      width={2100}
                      className={classes.link}
                      onClick={() => onClickEpisode(trackId)}
                    >
                      {trackName}
                    </TableCell>
                    <TableCell align="right" width={50} data-cy="episodes_date">
                      {new Date(releaseDate).toLocaleDateString()}
                    </TableCell>
                    <TableCell
                      align="right"
                      width={45}
                      data-cy="episodes_duration"
                    >
                      {millisToMinutesAndSeconds(trackTimeMillis)}
                    </TableCell>
                  </TableRow>
                )
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </Grid>
  );
};

export default PodcastEpisodes;
