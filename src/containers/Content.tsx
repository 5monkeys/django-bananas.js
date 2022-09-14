import { Box } from "@mui/material";
import React from "react";

const Content: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  return (
    <Box
      sx={{
        display: "flex",
        position: "relative",
        flexGrow: 1,
      }}
    >
      {children}
    </Box>
  );
};

export default Content;
