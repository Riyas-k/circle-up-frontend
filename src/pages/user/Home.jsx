import React from "react";
import Header from "../../components/user/Header/Header";
import Box from "@mui/material/Box";

function Home() {
  return (
    <>
      <Header />
      <Box
        sx={{
          width: 900,
          height: 300,
          marginTop: "2px",
          backgroundColor: "#EFF2F1",
          "&:hover": {
            backgroundColor: "#D8E2DC",
            opacity: [0.9, 0.8, 0.7],
          },
        }}
      />
    </>
  );
}

export default Home;
