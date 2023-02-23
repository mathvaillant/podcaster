import React from "react";

// Styles
import useStyles from "./styles";

export default function Home() {
  const { classes } = useStyles();

  return <div className={classes.root}>Home</div>;
}
