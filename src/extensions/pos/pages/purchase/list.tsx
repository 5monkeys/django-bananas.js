import React from "react";
import Tab from "@mui/material/Tab";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import Box from "@mui/material/Box";
import TabPanel from "@mui/lab/TabPanel";
import { PurchaseRow } from "../../components/PurchaseRow";
import TabList from "@mui/lab/TabList";
import TabContext from "@mui/lab/TabContext";
import { Purchase } from "../../types/purchase";
import Paper from "@mui/material/Paper";
import TableRow from "@mui/material/TableRow";
import Content from "../../../../containers/Content";

interface PurchaseListPageProps {
  data: {
    results: Purchase[];
  };
}

const PurchaseListPage: React.FC<PurchaseListPageProps> = ({ data }) => {
  const [tab, setTab] = React.useState("0");

  const onChange = (_event: React.SyntheticEvent, newTab: string) => {
    setTab(newTab);
  };

  return (
    <>
      <Content>
        <Box sx={{ width: "100%" }}>
          <TabContext value={tab}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList onChange={onChange}>
                <Tab label="Nya" value="0" />
                <Tab label="Bekräftade" value="1" />
                <Tab label="Levererade" value="2" />
                <Tab label="Makulerade" value="3" />
              </TabList>
            </Box>

            <TabPanel value="0">
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Purchase#</TableCell>
                      <TableCell>Kund</TableCell>
                      <TableCell>Adress</TableCell>
                      <TableCell>Ordervärde</TableCell>
                      <TableCell>Betalstatus</TableCell>
                      <TableCell>Orderdatum</TableCell>
                      <TableCell>Leveransdatum</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data?.results.map((purchase) => (
                      <PurchaseRow
                        key={purchase.number}
                        purchase={purchase}
                      />
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </TabPanel>

            <TabPanel value="1">
              Bekräftade
            </TabPanel>

            <TabPanel value="2">
              Levererade
            </TabPanel>

            <TabPanel value="3">
              Makulerade
            </TabPanel>
          </TabContext>
        </Box>
      </Content>
    </>
  );
};

export default PurchaseListPage;
