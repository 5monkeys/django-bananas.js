import Paper from "@mui/material/Paper";
import { useTheme } from "@mui/material/styles";
import React from "react";
import Content from "../../../../containers/Content";
import { useUser } from "../../../../contexts/UserContext";
import PasswordChangeForm from "../../components/PasswordChangeForm";

interface MePageProps {
  editable?: boolean;
}

const MePage: React.FC<MePageProps> = ({}) => {
  const theme = useTheme();
  const { user, logout } = useUser();

  return (
    <>
      <Content>
        <Paper
          sx={{
            padding: theme.spacing(3),
            alignSelf: "flex-start",
          }}
          elevation={1}
          square
        >
          <PasswordChangeForm />
        </Paper>
      </Content>
    </>
  );
};

export default MePage;
