// Base
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

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
  const { pathname } = useLocation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!loading) {
      setLoading(true);
    }
    setTimeout(() => setLoading(false), 500);
  }, [pathname]);

  const onClick = () => navigate("/");

  return (
    <AppBar classes={classes.root} variant="outlined" color="inherit">
      <Container maxWidth="lg">
        <Toolbar variant="dense" data-cy="tool_bar" id="tool_bar">
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
              data-cy="page_title"
            >
              Podcaster
            </Button>
            {loading && <CircularProgress size={20} thickness={8} />}
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
