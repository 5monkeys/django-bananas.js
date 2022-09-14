import { TableCell, TableRow } from "@mui/material";
import React from "react";
import { useRouter } from "../../../contexts/RouterContext";
import { Purchase } from "../types/purchase";

interface PurchaseRowProps {
  purchase: Purchase;
}

export const PurchaseRow: React.FC<PurchaseRowProps> = ({
  purchase,
}) => {
  const { navigate } = useRouter();

  const onClick = () => {
    navigate(`pos.purchase:detail`, {
      params: {
        purchase_number: purchase.number,
      },
    });
  };

  const purchaseNumber = purchase.number
    ? `#${purchase.number.toString().padStart(4, "0")}`
    : "-";

  return (
    <TableRow onClick={onClick} hover>
      <TableCell>{purchaseNumber}</TableCell>
      <TableCell>
        {purchase.email}
      </TableCell>
      <TableCell></TableCell>
      <TableCell>1337 SEK</TableCell>
      <TableCell>Betald</TableCell>
      <TableCell>
        {new Date(purchase.date_initiated).toLocaleString()}
      </TableCell>
      <TableCell>-</TableCell>
    </TableRow>
  );
};
