import Card from "@mui/material/Card";
import React from "react";
import { Receipt } from "../types/receipt";
import CardHeader from "@mui/material/CardHeader";
import List from "@mui/material/List";
import { ReceiptLine } from "./ReceiptLine";
import Divider from "@mui/material/Divider";
import CardContent from "@mui/material/CardContent";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { useTheme } from "@mui/material/styles";

interface ReceiptCardProps {
  receipt: Receipt;
}

interface ReceiptPriceRowProps {
  title: string;
  price: string;
}

const ReceiptPriceRow: React.FC<ReceiptPriceRowProps> = ({ title, price }) => {
  return (
    <TableRow>
      <TableCell align="right" sx={{ width: "75%" }}>
        <strong>
          {title}
        </strong>
      </TableCell>
      <TableCell align="right">
        {`${price} SEK`}
      </TableCell>
    </TableRow>
  );
};

export const ReceiptCard: React.FC<ReceiptCardProps> = ({
  receipt,
}) => {
  const theme = useTheme();

  return (
    <Card sx={{ width: 550 }}>
      <CardHeader title={"Receipt"} />
      <CardContent>
        <Divider />
        <List
          sx={{
            width: "100%",
          }}
        >
          {receipt.lines.map((line) => (
            <ReceiptLine key={line.reference} line={line} />
          )).reduce((
            prev,
            curr,
            index,
            // @ts-ignore Will fix this with a more elegant solution in the future but for now an ignore will have to do
          ) => [prev, <Divider key={index} light />, curr])}
        </List>
        <Divider />
        <TableContainer
          sx={{
            paddingTop: theme.spacing(2),
            paddingX: theme.spacing(4),
          }}
        >
          <Table
            padding="none"
            sx={{
              [`& .${tableCellClasses.root}`]: {
                borderBottom: "none",
              },
            }}
          >
            <TableBody sx={{ border: "none" }}>
              <ReceiptPriceRow
                title="Discount"
                price={receipt.total_discount_amount}
              />
              <ReceiptPriceRow
                title="Tax"
                price={receipt.total_tax_amount}
              />
              <ReceiptPriceRow
                title="Total"
                price={receipt.total_amount}
              />
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
};
