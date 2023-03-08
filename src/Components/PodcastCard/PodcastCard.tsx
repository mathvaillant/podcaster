// Base
import React from "react";
import { useNavigate } from "react-router-dom";

// MUI
import { Card, CardContent, Typography } from "@mui/material";

// Types
import { IPodCast } from "/@/Types/Podcast";

// Styles
import useStyles from "./styles";

interface Props {
  podcast: IPodCast;
}

const PodcastCard: React.FC<Props> = ({ podcast }) => {
  const { classes } = useStyles();
  const navigate = useNavigate();
  const podcastId = podcast.id.attributes["im:id"];

  const onClick = () => {
    navigate(`podcasts/${podcastId}`);
  };

  return (
    <div className={classes.root} onClick={onClick} data-id={podcastId}>
      <img
        className={classes.img}
        src={podcast["im:image"].at(-1).label}
        data-testid="card_image"
      />
      <Card className={classes.cardWrapper}>
        <CardContent>
          <Typography className={classes.title} data-testid="card_name">
            {podcast["im:name"].label}
          </Typography>
          <Typography className={classes.author} data-testid="card_author">
            Author: {podcast["im:artist"].label}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default PodcastCard;
