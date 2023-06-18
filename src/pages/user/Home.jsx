import React, { useEffect, useState } from "react";
import Header from "../../components/user/Header/Header";
import Box from "@mui/material/Box";
import Posts from "../../components/user/Posts";
import PeopleYouMayKnow from "../../components/user/PeopleKnow";
import ActiveNow from "../../components/user/ActiveNow";

function Home() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handlePostScroll = (e) => {
    // Prevent scrolling on parent elements
    e.stopPropagation();
  };

  return (
    <>
      <Header />
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        {!isMobile ? (
          <>
            <Posts onScroll={handlePostScroll} />
            <Box
              sx={{
                display: "flex",
                marginLeft: "5px",
                flexDirection: "column",
              }}
            >
              <Box
                sx={{
                  width: 500,
                  height: 350,
                  marginTop: "5px",
                  backgroundColor: "#EFF2F1",
                }}
              >
                <PeopleYouMayKnow />
              </Box>
              <Box
                sx={{
                  width: 500,
                  height: 350,
                  marginTop: "5px",
                  backgroundColor: "#EFF2F1",
                }}
              >
                <ActiveNow />
              </Box>
            </Box>
          </>
        ) : (
          <Posts onScroll={handlePostScroll} />
        )}
      </Box>
    </>
  );
}

export default Home;
