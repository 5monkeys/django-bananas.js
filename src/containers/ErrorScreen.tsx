import React from "react";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { useTheme } from "@mui/material/styles";
import { Button, CardActions, Typography } from "@mui/material";
import { PageLoadFailedError } from "./PageLoader";
import { useI18n } from "../contexts/I18nContext";
import { useUser } from "../contexts/UserContext";

const errorMessages = {
  403:
    "You are authenticated as %(username)s, but are not authorized to access this page. Would you like to login to a different account?",
  404: "We're sorry, but the requested page could not be found.",
  501: "We're sorry, but the requested page could not be found.",
};

interface ErrorScreenInnerProps {
  error: PageLoadFailedError;
}

const ErrorScreen: React.FC<ErrorScreenInnerProps> = ({
  error,
}) => {
  const { t } = useI18n();
  const { user, logout } = useUser();
  const theme = useTheme();

  return (
    <Card>
      <CardContent>
        <Typography variant="h4">
          {error.message}
        </Typography>

        <Typography>
          {t(
            error.response.status >= 500
              ? "There's been an error. It's been reported to the site administrators via email and should be fixed shortly. Thanks for your patience."
              : errorMessages[error.response.status] ?? "",
            (user as unknown as Record<string, string>) ?? {},
          )}
        </Typography>
      </CardContent>
      <CardActions>
        {error.response.status === 403 && (
          <Box sx={{ marginTop: theme.spacing(3), textAlign: "right" }}>
            <Button
              variant="contained"
              color="secondary"
              onClick={() =>
                logout()}
              sx={{ boxShadow: "none" }}
            >
              {t("Log in again")}
            </Button>
          </Box>
        )}
      </CardActions>
    </Card>
  );
};

export default ErrorScreen;
