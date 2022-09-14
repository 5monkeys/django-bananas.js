import React from "react";
import { Dialog, DialogTitle, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import LoginForm from "../forms/LoginForm";
import Logo from "../components/Logo";
import { LogoType } from "../types";

interface LoginPageProps {
  title?: string;
  logo?: LogoType;
  form?: React.ElementType;
}

const LoginPage: React.FC<LoginPageProps> = (
  { title, logo, form: Form },
) => {
  const theme = useTheme();
  Form ??= LoginForm;

  return (
    <Dialog open>
      <DialogTitle
        sx={{
          borderBottom: `1px solid ${theme.palette.divider}`,
          margin: 0,
          textAlign: "center",
          backgroundColor: theme.palette.primary.main,
          padding: theme.spacing(2),
        }}
      >
        {logo ? <Logo src={logo} /> : (
          <Typography
            sx={{
              color: theme.palette.primary.contrastText,
              fontWeight: "bold",
            }}
          >
            {title}
          </Typography>
        )}
      </DialogTitle>
      <Form />
    </Dialog>
  );
};

export default LoginPage;
