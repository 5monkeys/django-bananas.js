import { useSnackbar } from "notistack";
import React from "react";

import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormLabel from "@mui/material/FormLabel";
import { useTheme } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import { useApi } from "../../../contexts/ApiContext";
import { useI18n } from "../../../contexts/I18nContext";
import { useUser } from "../../../contexts/UserContext";
import LoadingButton from "@mui/lab/LoadingButton";

const PasswordChangeForm: React.FC = () => {
  const theme = useTheme();
  const { t } = useI18n();
  const api = useApi();
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = React.useState(false);

  const operation = api.operations["bananas.change_password:create"];
  const { properties } = operation.request.body.schema;
  const [fields, setFields] = React.useState<Record<string, string>>({
    "old_password": "",
    "new_password1": "",
    "new_password2": "",
  });

  const { changePassword } = useUser();

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    changePassword(
      fields.old_password,
      fields.new_password1,
      fields.new_password2,
    ).then(() => {
      enqueueSnackbar(t("Password changed successfully."), {
        variant: "success",
      });
      setFields({
        "old_password": "",
        "new_password1": "",
        "new_password2": "",
      });
    }).catch(() => {
      enqueueSnackbar(t("Incorrect authentication credentials."), {
        variant: "error",
      });
    }).finally(() => setLoading(false));
  };

  const onChange = (
    event: React.ChangeEvent<{ name: string; value: string }>,
  ) => {
    setFields({
      ...fields,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <Box
      component="form"
      onSubmit={onSubmit}
      sx={{
        maxWidth: 350,
      }}
      data-testid="change-password-form"
    >
      <FormLabel
        component="legend"
        sx={{
          marginBottom: theme.spacing(2),
        }}
      >
        {operation.summary}
      </FormLabel>
      <Typography>
        {t(
          "Please enter your old password, for security's sake, and then enter your new password twice so we can verify you typed it in correctly.",
        )}
      </Typography>
      <FormControl fullWidth component="fieldset">
        <FormGroup>
          {["old_password", "new_password1", "new_password2"].map((field) => (
            <TextField
              key={field}
              autoComplete={field}
              sx={{
                marginTop: theme.spacing(3),
              }}
              label={properties[field].title}
              inputProps={{ "aria-label": properties[field].title }}
              name={field}
              value={fields[field]}
              type="password"
              onChange={onChange}
              fullWidth
              required
              color="secondary"
            />
          ))}
        </FormGroup>
      </FormControl>

      <FormControl
        fullWidth
        margin="normal"
        sx={{
          marginTop: theme.spacing(3),
          marginBottom: 0,
        }}
      >
        <LoadingButton
          sx={{
            margin: "auto"
          }}
          variant="outlined"
          type="submit"
          color="secondary"
          fullWidth
          aria-label="login"
          loading={loading}
        >
          {t("Change my password")}
        </LoadingButton>
      </FormControl>
    </Box>
  );
};

export default PasswordChangeForm;
