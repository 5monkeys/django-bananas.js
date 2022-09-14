import React from "react";

import { LinearProgress } from "@mui/material";

interface ProgressBarProps {
  loading?: boolean;
  color?:
    | "primary"
    | "secondary"
    | "error"
    | "info"
    | "success"
    | "warning"
    | "inherit"
    | undefined;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  loading,
  color,
}) => {
  loading ??= true;
  color ??= "secondary";

  return (
    loading && <LinearProgress color={color} />
  );
};

export default ProgressBar;
