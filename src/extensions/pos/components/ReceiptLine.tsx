import React from "react";
import { ReceiptLine as ReceiptLineType } from "../types/receipt";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";

interface ReceiptLineProps {
  line: ReceiptLineType;
}

export const ReceiptLine: React.FC<ReceiptLineProps> = ({
  line,
}) => {
  return (
    <ListItem
      sx={{ display: "flex", flexDirection: "line", alignItems: "baseline" }}
    >
      <ListItemText
        sx={{ width: "50%" }}
        primary={line.title}
        secondary={line.reference}
      />
      <Tooltip title="Quantity">
        <ListItemText
          sx={{ width: "20%" }}
          primary={`${line.quantity} st`}
        />
      </Tooltip>
      <ListItemText
        disableTypography
        sx={{ width: "30%" }}
        primary={
          <Tooltip title="Price">
            <Typography>{`${line.total_amount} SEK`}</Typography>
          </Tooltip>
        }
        secondary={
          <>
            <Tooltip title="Tax">
              <Typography>{line.total_tax_amount} SEK</Typography>
            </Tooltip>
            <Tooltip title="Discount">
              <Typography>{line.total_discount_amount} SEK</Typography>
            </Tooltip>
          </>
        }
      />
    </ListItem>
  );
};
