import React from "react";
import { useNavigate } from "react-router-dom";

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
import { millisToHoursMinutesAndSeconds } from "/@/Utils/time";

// Hooks
import usePodcastEpisodes from "./PodcastEpisodes.hook";

const PodcastEpisodes = () => {
  const { classes } = useStyles();
  const navigate = useNavigate();
  const { episodes } = usePodcastEpisodes();

  const onClickEpisode = (episodeId: number) => {
    navigate(`episode/${episodeId}`);
  };

  return (
    <Grid xs={12} className={classes.root}>
      <Card elevation={3} className={classes.topCard}>
        <Typography
          variant="h5"
          className={classes.title}
          data-testid="episodes_title"
        >
          Episodes: {episodes.length}
        </Typography>
      </Card>
      <Card
        elevation={3}
        className={classes.bottomCard}
        data-testid="episodes_table"
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
                    data-testid="episodes_row"
                    sx={{
                      "&:nth-of-type(odd)": { backgroundColor: "#fafafa" }
                    }}
                  >
                    <TableCell
                      component="th"
                      scope="row"
                      data-testid="episodes_track_name"
                      width={2100}
                      className={classes.link}
                      onClick={() => onClickEpisode(trackId)}
                    >
                      {trackName}
                    </TableCell>
                    <TableCell
                      align="right"
                      width={50}
                      data-testid="episodes_date"
                    >
                      {new Date(releaseDate).toLocaleDateString()}
                    </TableCell>
                    <TableCell
                      align="right"
                      width={45}
                      data-testid="episodes_duration"
                    >
                      {millisToHoursMinutesAndSeconds(trackTimeMillis)}
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
