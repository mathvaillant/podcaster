import React from "react";

// MUI
import { Container } from "@mui/material";

// Components
import Header from "../Components/Header/Header";

const PageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Container
      maxWidth="lg"
      data-testid="page-layout"
      sx={{
        display: "flex",
        flexDirection: "column",
        marginTop: "6rem",
        gap: "3rem"
      }}
    >
      <Header />
      {children}
    </Container>
  );
};

export default PageLayout;
