import { useSnackbar } from "notistack";
import React from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Stack from "@mui/material/Stack";
import { useTheme } from "@mui/material/styles";
import TextField from "@mui/material/TextField";

import { useApi } from "../contexts/ApiContext";
import { useI18n } from "../contexts/I18nContext";
import { useUser } from "../contexts/UserContext";
import LoadingButton from "@mui/lab/LoadingButton";

const LoginForm: React.FC = () => {
  const theme = useTheme();
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useI18n();
  const { login } = useUser();
  const api = useApi();

  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const operation = api.operations["bananas.login:create"];
  const { properties } = operation.request.body.schema;

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    login(username, password).then((user) => {
      if (user !== null) {
        enqueueSnackbar(`${t("Welcome,")} ${user.full_name}`, {
          variant: "success",
        });
      } else {
        enqueueSnackbar(t("Unable to log in with provided credentials."), {
          variant: "error",
        });
      }
    }).finally(() => setLoading(false));
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <DialogContent>
        <Stack spacing={1}>
          <TextField
            autoFocus
            fullWidth
            label={properties.username.title}
            name="username"
            type="text"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            color={"secondary"}
            inputProps={{ "aria-label": "Username" }}
          />
          <TextField
            fullWidth
            label={properties.password.title}
            name="password"
            type="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            color="secondary"
            inputProps={{ "aria-label": "Password" }}
          />
        </Stack>
      </DialogContent>
      <DialogActions
        sx={{
          borderTop: `1px solid ${theme.palette.divider}`,
          margin: 0,
          padding: theme.spacing(1),
        }}
      >
        <LoadingButton
          sx={{
            margin: "auto",
          }}
          variant="contained"
          type="submit"
          color="secondary"
          aria-label="login"
          loading={loading}
        >
          {t("Log in")}
        </LoadingButton>
      </DialogActions>
    </Box>
  );
};

export default LoginForm;
