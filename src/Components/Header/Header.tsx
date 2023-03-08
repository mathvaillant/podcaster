// Base
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// Custom hooks 
import useGlobalStore from "/@/Context/Global/Global.hook";

// MUI
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  CircularProgress
} from "@mui/material";

// Styles
import useStyles from "./styles";

export default function Header() {
  const { classes } = useStyles();
  const navigate = useNavigate();
  const [{ globalLoader }, _] = useGlobalStore();

  const onClick = () => navigate("/");

  return (
    <AppBar elevation={1} className={classes.root} color="inherit">
      <Container maxWidth="lg">
        <Toolbar variant="dense" data-testid="tool-bar" id="tool-bar">
          <Typography
            variant="h6"
            noWrap
            component="div"
            className={classes.div}
          >
            <Button
              size="large"
              className={classes.button}
              onClick={onClick}
              data-testid="page-title"
            >
              Podcaster
            </Button>
            {globalLoader === "loading" && (
              <CircularProgress size={20} thickness={8} />
            )}
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
