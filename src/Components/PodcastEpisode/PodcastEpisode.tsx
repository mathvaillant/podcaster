import React, { useState, useRef, SyntheticEvent } from "react";
import { useLoaderData } from "react-router-dom";

// MUI
import {
  Card,
  Divider,
  Grid,
  IconButton,
  Slider,
  Typography
} from "@mui/material";
import { PlayArrow, Pause, VolumeOff, VolumeUp } from "@mui/icons-material";

// Styles
import useStyles from "./styles";

// Utils
import { millisToMinutesAndSeconds } from "/@/Utils/time";

// Types
import { IEpisode } from "/@/Types/Podcast";

interface ILoaderData {
  episode: IEpisode;
}

const PodcastEpisode = () => {
  const { classes } = useStyles();
  const { episode } = useLoaderData() as ILoaderData;

  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [mute, setMute] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);

  const audioRef = useRef<any>(null);

  function handlePlayPause() {
    const audio = audioRef.current;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
      return;
    }

    audio.play();
    setIsPlaying(true);
  }

  function onTimeUpdate(e: any) {
    const currTime = Math.floor(e.target.currentTime);
    const duration = Math.floor(e.target.duration);
    const progressPercent = (currTime / duration) * 100;
    setProgress(progressPercent);
    setCurrentTime(currTime);
  }

  function handleSeek(
    event: Event,
    value: number | number[],
    activeThumb: number
  ) {
    const audio = audioRef.current;

    if (typeof value !== "number") return;

    const seekTime = (value / 100) * audio.duration;
    audio.currentTime = seekTime;
    setProgress(value);
    setCurrentTime(seekTime);
  }

  function handleMute() {
    const audio = audioRef.current;
    if (mute) {
      audio.volume = 1;
      setMute(false);
    } else {
      audio.volume = 0;
      setMute(true);
    }
  }

  return (
    <Grid xs={12} className={classes.root}>
      <Card elevation={3} className={classes.cardWrapper}>
        <Typography variant="h5" data-cy="episode_title">
          {episode.trackName}
        </Typography>
        <Typography variant="subtitle1" className={classes.desc}>
          {episode?.description || ""}
        </Typography>
        <Divider sx={{ margin: "1rem 0rem" }} />
        <Card>
          <div className={classes.audioBar} data-cy="episode_audio">
            <audio
              ref={audioRef}
              src={episode.episodeUrl}
              onTimeUpdate={onTimeUpdate}
            />
            {isPlaying ? (
              <Pause
                fontSize="large"
                onClick={handlePlayPause}
                data-cy="episode_pause"
              />
            ) : (
              <PlayArrow
                fontSize="large"
                onClick={handlePlayPause}
                data-cy="episode_play"
              />
            )}
            <Slider
              size="small"
              value={progress}
              onChange={handleSeek}
              className={classes.slider}
            />
            {mute ? (
              <VolumeOff onClick={handleMute} />
            ) : (
              <VolumeUp onClick={handleMute} />
            )}
            <Typography variant="subtitle2" className={classes.time}>
              {millisToMinutesAndSeconds(currentTime * 1000)}
            </Typography>
          </div>
        </Card>
      </Card>
    </Grid>
  );
};

export default PodcastEpisode;
