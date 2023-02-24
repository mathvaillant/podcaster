import React from "react";
import { useNavigate } from "react-router-dom";

// MUI
import { Button, Container, Typography } from "@mui/material";

interface Props {
  message?: string;
}

const NotFound: React.FC<Props> = ({ message }) => {
  const navigate = useNavigate();
  const handleGoBack = () => navigate("/");

  return (
    <Container
      maxWidth="md"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "10rem",
        gap: "1rem"
      }}
    >
      <Typography variant="h4">{message || "Could not find page"}</Typography>
      <Button variant="contained" size="small" onClick={handleGoBack}>
        Go Back
      </Button>
    </Container>
  );
};

export default NotFound;
